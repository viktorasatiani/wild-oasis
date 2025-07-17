<script setup lang="ts">
import { isFuture, isPast, isToday } from "date-fns";
import { bookings } from "~/composables/data-bookings";
import { cabins } from "~/composables/data-cabins";
import { guests } from "~/composables/data-guests";
import { subtractDates } from "~/composables/helpers";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
  else console.log("bookings deleted successfully");
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  if (guestsIds === null || cabins === undefined) {
    console.error("Guests IDs are null");
    return;
  } else {
    const allGuestIds = guestsIds.map((cabin) => cabin.id);
    const { data: cabinsIds } = await supabase
      .from("cabins")
      .select("id")
      .order("id");
    if (cabinsIds === null) {
      console.error("Cabins IDs are null");
      return;
    } else {
      const allCabinIds = cabinsIds.map((cabin) => cabin.id);
      const finalBookings = bookings.map((booking) => {
        // Here relying on the order of cabins, as they don't have and ID yet
        const cabin = cabins.at(booking.cabinId - 1);
        if (!cabin) {
          console.error(
            `Cabin not found for booking cabinId: ${booking.cabinId}`,
          );
          throw new Error(`Missing cabin data for booking ${booking.cabinId}`);
        }
        const numNights = subtractDates(booking.endDate, booking.startDate);
        // Use price and discount (matching your data structure)
        const cabinPrice = numNights * (cabin.price - cabin.discount);
        const extrasPrice = booking.hasBreakfast
          ? numNights * 15 * booking.numGuests
          : 0; // hardcoded breakfast price
        const totalPrice = cabinPrice + extrasPrice;

        let status: "checkedOut" | "unconfirmed" | "checkedIn" = "unconfirmed";
        if (
          isPast(new Date(booking.endDate)) &&
          !isToday(new Date(booking.endDate))
        )
          status = "checkedOut";
        if (
          isFuture(new Date(booking.startDate)) ||
          isToday(new Date(booking.startDate))
        )
          status = "unconfirmed";
        if (
          (isFuture(new Date(booking.endDate)) ||
            isToday(new Date(booking.endDate))) &&
          isPast(new Date(booking.startDate)) &&
          !isToday(new Date(booking.startDate))
        )
          status = "checkedIn";

        return {
          ...booking,
          numNights,
          cabinPrice,
          extrasPrice,
          totalPrice,
          guestId: allGuestIds.at(booking.guestId - 1),
          cabinId: allCabinIds.at(booking.cabinId - 1),
          status,
        };
      });
      console.log(finalBookings);
      const { error } = await supabase.from("bookings").insert(finalBookings);
      if (error) console.log(error.message);
    }
  }
}

const isLoading = ref<boolean>(false);
async function uploadAll() {
  isLoading.value = true;
  // Bookings need to be deleted FIRST
  await deleteBookings();
  await deleteGuests();
  await deleteCabins();
  // Bookings need to be created LAST
  await createGuests();
  await createCabins();
  await createBookings();
  isLoading.value = false;
}
async function uploadBookings() {
  console.log("Uploading bookings only");
  isLoading.value = true;
  await deleteBookings();
  await createBookings();
  isLoading.value = false;
}
</script>

<template>
  <div
    class="mt-auto flex flex-col gap-2 rounded bg-indigo-100 p-2 text-center"
  >
    <h3>SAMPLE DATA</h3>

    <button @click="() => uploadAll()">Upload ALL</button>
    <button @click="() => uploadBookings()">Upload bookings ONLY</button>
  </div>
</template>
