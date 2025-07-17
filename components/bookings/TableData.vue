<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
const { bookings, refresh } = defineProps<{
  bookings: BookingTable[];
  refresh: () => void;
}>();

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const toast = useToast();

async function handleDeleteCabin(id: number) {
  console.log("Deleting cabin with ID:", id);
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      throw error;
    }
    toast.add({
      title: "Cabin deleted successfully",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: `${error} Error deleting cabin`,
      color: "error",
    });
  }
}
const columns: TableColumn<BookingTable>[] = [
  {
    accessorKey: "cabinsId",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Cabin",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      const cabinName = row.getValue("cabinsId") as string;
      return h("span", { class: "capitalize  px-10" }, cabinName);
    },
  },
  {
    accessorKey: "guestsName",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Guest",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Start Date",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startDate") as string);

      return `${startDate.toLocaleDateString()}`;
    },
    meta: { class: { td: "text-center" } },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "End Date",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      const endDate = new Date(row.getValue("endDate") as string);

      return `${endDate.toLocaleDateString()}`;
    },
    meta: { class: { td: "text-center" } },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Status",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      const color = {
        checkedIn: "success" as const,
        unconfirmed: "info" as const,
        checkedOut: "neutral" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status"),
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Amount",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      const totalPrice = row.getValue("totalPrice") as number;
      return `${totalPrice !== null ? totalPrice.toFixed(2) : ""} $`;
    },
    meta: {
      class: {
        td: "px-10",
      },
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto ",
              "aria-label": "Actions dropdown",
            }),
        ),
      );
    },
  },
];

function getRowItems(row: Row<BookingTable>) {
  return [
    {
      label: "Edit",
      icon: "heroicons-solid:wrench-screwdriver",
      onSelect() {
        navigateTo(`/edit-booking/${row.original.id}`);
      },
    },

    {
      label: "Delete",
      icon: "heroicons-solid:trash",
      onSelect: async () => {
        await handleDeleteCabin(Number(row.original.id));
        refresh();
      },
    },
  ];
}
</script>

<template>
  <div class="w-full">
    <UTable
      ref="table"
      :data="bookings"
      :columns="columns"
      :ui="{
        root: 'p-4 max-h-[70dvh] ',
        td: 'p-1',
      }"
    />
  </div>
</template>
