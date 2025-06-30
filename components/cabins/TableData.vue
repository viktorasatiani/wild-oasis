<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
const props = defineProps<{
  cabins: Cabin[];
  refresh: () => void;
}>();

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const toast = useToast();

async function handleDeleteCabin(id: number) {
  console.log("Deleting cabin with ID:", id);
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

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
const columns: TableColumn<Cabin>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return h("img", {
        src: row.getValue("image"),
        alt: row.getValue("name"),
        class: "w-18 h-18 object-cover",
      });
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Name",
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
    accessorKey: "capacity",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Capacity",
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
    accessorKey: "price",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Price",
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
      const price = row.getValue("price") as number;
      return `${price.toFixed(2)} $`;
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Discount",
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
      const discount = row.getValue("discount") as number;
      return discount !== 0 ? `${discount.toFixed(2)} $` : "_";
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

function getRowItems(row: Row<Cabin>) {
  return [
    {
      label: "Edit",
      icon: "heroicons-solid:wrench-screwdriver",
      onSelect() {
        navigateTo(`/edit-cabin/${row.original.id}`);
      },
    },

    {
      label: "Delete",
      icon: "heroicons-solid:trash",
      onSelect: async () => {
        await handleDeleteCabin(Number(row.original.id));
        props.refresh();
      },
    },
  ];
}
</script>

<template>
  <div class="w-full">
    <UTable
      ref="table"
      :data="cabins"
      :columns="columns"
      :ui="{
        root: 'p-4',
        td: 'p-1',
      }"
    />
  </div>
</template>
