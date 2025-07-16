<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
const { bookings, refresh } = defineProps<{
  bookings: Booking[];
  refresh: () => void;
}>();

const UButton = resolveComponent("UButton");
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
const columns: TableColumn<Booking>[] = [
  {
    accessorKey: "cabins.name",
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
  },
  {
    accessorKey: "guests.fullName",
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
        label: "Dates",
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
      return `${totalPrice.toFixed(2)} $`;
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

function getRowItems(row: Row<Booking>) {
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
