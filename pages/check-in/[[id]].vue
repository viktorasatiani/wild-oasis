<script setup lang="ts">
import { useRoute } from "vue-router";
import { format } from "date-fns";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const toast = useToast();
const id = route.params.id as string;
const userId = computed(() => `user-${route.params.id}`);
const wantBreakfast = ref(false);
const confirmationOfPayment = ref(false);

const { data: booking, error: bookingError } =
  await useAsyncData<BookingDetails>(userId, async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*, cabins(name), guests(fullName, email,nationalID,countryFlag)")
      .eq("id", Number(id));

    return data?.[0] as BookingDetails;
  });
if (bookingError.value) {
  toast.add({
    title: "Error fetching booking details",
    description: bookingError.value.message,
    color: "error",
  });
}
const {
  created_at,
  startDate,
  endDate,
  numNights,
  numGuests,
  totalPrice,
  hasBreakfast,
  status,
  guests,
  cabins,
  observations,
} = booking.value ?? {};
const { data: settings, error: settingsError } = await useAsyncData<Settings>(
  "settings",
  async () => {
    const { data: settings, error } = await supabase
      .from("settings")
      .select("breakfastPrice");
    if (error) {
      throw error;
    }
    return settings?.[0] as Settings;
  },
);
if (settingsError.value) {
  toast.add({
    title: "Error fetching Settings",
    description: settingsError.value.message,
    color: "error",
  });
}
const { breakfastPrice } = settings.value ?? {};

const statusColor = computed(() => {
  switch (booking.value?.status) {
    case "unconfirmed":
      return "info";
    case "checkedIn":
      return "primary";
    case "checkedOut":
      return "neutral";
    default:
      return "neutral";
  }
});
const optionalBreakfastPrice = computed(() => {
  if (numGuests && numNights && hasBreakfast !== null && breakfastPrice) {
    return numGuests * breakfastPrice * numNights;
  } else {
    return 0;
  }
});
const finalPrice = computed(() => {
  if (
    wantBreakfast.value !== false &&
    totalPrice &&
    optionalBreakfastPrice.value
  ) {
    return totalPrice + optionalBreakfastPrice.value;
  } else {
    return totalPrice;
  }
});
async function deleteBooking(id: number) {
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      throw error;
    } else {
      toast.add({
        title: "Booking Deleted",
        description: "The booking has been successfully deleted.",
        color: "success",
      });
      // Optionally, redirect or refresh the page
      await navigateTo("/bookings");
    }
  } catch (error) {
    toast.add({
      title: "Error Deleting Booking",
      description:
        `${error}` || "An error occurred while deleting the booking.",
      color: "error",
    });
  }
}
function deleteBookingToast() {
  toast.add({
    title: "Delete Booking",
    description: "You can't reverse this action. Are you sure?",
    color: "warning",
    actions: [
      {
        icon: "i-heroicons-solid:trash",
        label: "Yes, delete",
        color: "error",
        variant: "outline",
        onClick: (e) => {
          e?.stopPropagation();
          deleteBooking(Number(id));
        },
      },
    ],
  });
}

async function checkInBooking(id: string) {
  if (!confirmationOfPayment.value) {
    toast.add({
      title: "Payment Confirmation Required",
      description: "Please confirm that the payment has been made.",
      color: "warning",
    });
    return;
  } else {
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "checkedIn",
        hasBreakfast: wantBreakfast.value,
        isPaid: true,
        extrasPrice: optionalBreakfastPrice.value,
        totalPrice: finalPrice.value,
      })
      .eq("id", Number(id))
      .select();
    if (error) {
      toast.add({
        title: "Error Checking In",
        description: `${error}`,
        color: "error",
      });
    } else {
      toast.add({
        title: "Booking Checked In",
        description: "The booking has been successfully checked in.",
        color: "success",
      });
      await navigateTo("/bookings");
    }
  }
}
</script>

<template>
  <div
    v-if="booking"
    class="mx-auto box-border flex w-[calc(100%-20rem)] flex-col"
  >
    <div class="flex items-center justify-between py-8">
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-3xl font-bold">Booking #{{ id }}</h1>
        <UBadge :color="statusColor">{{ status?.toUpperCase() }}</UBadge>
      </div>
      <div
        class="text-brand-500 flex items-center justify-center font-semibold hover:cursor-pointer"
      >
        <UButton
          :to="'/bookings'"
          variant="ghost"
          label="Back"
          size="xl"
          :icon="'heroicons-solid:arrow-left'"
          class="text-brand-500 hover:text-brand-600 hover:cursor-pointer hover:bg-transparent"
        />
      </div>
    </div>
    <div
      class="bg-grey-100 border-grey-200 mx-auto h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-sm border shadow-2xl"
    >
      <div
        class="bg-brand-500 flex items-center justify-between rounded-sm px-8 py-4"
      >
        <div
          class="flex items-center justify-center gap-6 text-xl font-bold text-white"
        >
          <UIcon name="heroicons-solid:building-office" class="size-10" />
          <p>
            {{ numNights }} nights in Cabin
            {{ cabins?.name }}
          </p>
        </div>
        <p class="text-white">
          <span class="font-semibold"> From </span>
          {{ format(String(startDate), "dd/MMM/yyyy") }}
          <span class="font-semibold"> - To </span>
          {{ format(String(endDate), "dd/MMM/yyyy") }}
        </p>
      </div>
      <div class="flex flex-col gap-6 px-12 py-8">
        <div class="flex items-center gap-2">
          <NuxtImg :src="guests.countryFlag ?? ''" width="30" height="50" />
          <p class="flex items-center gap-2">
            {{ guests.fullName }} +
            {{ numGuests ? numGuests - 1 : 0 }}
            <span class="text-grey-700/40 font-bold"
              >{{ guests.email }} - National ID: {{ guests.nationalID }}</span
            >
          </p>
        </div>
        <div v-if="observations" class="flex items-start gap-2">
          <UIcon name="heroicons-solid:chat" class="text-brand-200 size-6" />
          <p>
            Observations: <span>{{ observations }}</span>
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UIcon
            name="heroicons-solid:check-circle"
            class="text-brand-200 size-6"
          />
          <p>
            Breakfast Included ?
            <span>{{ hasBreakfast ? "Yes" : "No" }}</span>
          </p>
        </div>
        <div
          :class="`${status === 'unconfirmed' ? 'bg-yellow-100' : 'bg-green-600'} flex justify-between rounded-sm p-4 font-semibold uppercase`"
        >
          <div class="flex items-center gap-2">
            <UIcon name="heroicons:currency-dollar" class="size-6" />
            <p>total price ${{ totalPrice?.toPrecision(6) }}</p>
          </div>
          <div>
            {{ statusColor === "info" ? "will pay at property" : "paid" }}
          </div>
        </div>
        <p class="text-grey-400 text-xs">
          Booked on
          {{ format(String(created_at), "E, MMM dd yyyy, h:mm a") }}
        </p>
      </div>
    </div>
    <div
      v-if="status === 'unconfirmed' && hasBreakfast === false"
      class="bg-grey-100 border-grey-200 mx-auto mt-6 w-[calc(100%-2rem)] rounded-sm border px-4 py-8 shadow-2xl"
    >
      <UCheckbox
        v-model="wantBreakfast"
        :label="`${`Want to add Breakfast for $${optionalBreakfastPrice.toPrecision(5)} Price?`}`"
      />
    </div>
    <div
      v-if="status === 'unconfirmed'"
      class="bg-grey-100 border-grey-200 mx-auto mt-6 w-[calc(100%-2rem)] rounded-sm border px-4 py-8 shadow-2xl"
    >
      <UCheckbox
        v-model="confirmationOfPayment"
        :label="`${`I confirm that rises sky has paid the total amount of  $${totalPrice && wantBreakfast ? `${(totalPrice + optionalBreakfastPrice).toPrecision(5)}  ($${totalPrice.toPrecision(5)} + $${optionalBreakfastPrice.toPrecision(5)})` : totalPrice && totalPrice.toPrecision(5)}`}`"
      />
    </div>
    <div class="mt-6 flex items-center justify-end gap-2 px-4">
      <UButton
        v-if="status === 'unconfirmed'"
        :label="`Check in #${`${id}`}`"
        color="secondary"
        class="cursor-pointer"
        @click="checkInBooking(id)"
      />
      <UButton
        v-if="status !== 'unconfirmed'"
        class="cursor-pointer"
        label="Delete Booking"
        color="error"
        @click="deleteBookingToast"
      />
    </div>
  </div>
</template>
