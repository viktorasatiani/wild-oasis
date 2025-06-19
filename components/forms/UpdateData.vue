<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const form = useTemplateRef("form");
type Schema = z.output<typeof UpdateDataSchema>;

const state = reactive<Partial<Schema>>({
  email: user.value?.email || "",
  userName: undefined,
  avatar: undefined,
});
const toast = useToast();
async function UpdateUser(userName: string, avatar: File) {
  try {
    if (avatar !== undefined && userName !== undefined) {
      const fileName = `avatar-${Date.now()}.jpg`;
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, {
          contentType: "image/jpg",
        });

      if (storageError) {
        throw storageError;
      }
      if (!storageError) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);
        const avatarUrl = data.publicUrl;
        const { error } = await supabase.auth.updateUser({
          data: {
            name: userName,
            avatar: avatarUrl,
          },
        });
        if (error) {
          throw error;
        }
      }
    } else if (userName !== undefined) {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: userName,
        },
      });
      if (error) {
        throw error;
      }
    } else if (avatar !== undefined) {
      const fileName = `avatar-${Date.now()}.jpg`;
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, {
          contentType: "image/jpg",
        });

      if (storageError) {
        throw storageError;
      }
      if (!storageError) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);
        const avatarUrl = data.publicUrl;
        const { error } = await supabase.auth.updateUser({
          data: {
            avatar: avatarUrl,
          },
        });
        if (error) {
          throw error;
        }
      }
    }
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to update user data.",
      color: "error",
    });
    console.error("Error updating user:", error);
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await UpdateUser(event.data.userName as string, event.data.avatar as File);
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <div class="flex flex-col gap-8 py-14">
    <h1 class="text-2xl font-bold">Update User Data</h1>
    <UForm
      ref="form"
      :schema="UpdateDataSchema"
      :state="state"
      class="bg-grey-100 space-y-4 rounded-sm p-8"
      @submit="onSubmit"
    >
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="email" class="w-1/5 font-semibold">Email</label>
        <UFormField name="email">
          <UInput
            id="email"
            v-model="state.email"
            disabled
            :ui="{
              base: ' disabled:bg-grey-50/10',
            }"
          />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="userName" class="w-1/5 font-semibold">User Name</label>
        <UFormField name="userName">
          <UInput id="userName" v-model="state.userName" />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="avatar" class="w-1/5 font-semibold">Avatar URL</label>
        <UFormField name="avatar">
          <UInput
            id="avatar"
            type="file"
            class="w-[162px]"
            @change="
              (e: Event) => {
                const files = (e.target as HTMLInputElement).files;
                state.avatar = files && files.length > 0 ? files[0] : undefined;
              }
            "
          />
        </UFormField>
      </div>
      <div class="flex justify-end pt-4">
        <UButton type="submit" class="bg-grey-200 text-grey-900">
          Submit
        </UButton>
        <UButton
          class="bg-grey-200 text-grey-900 ml-2"
          @click="
            state.email = '';
            state.userName = '';
            state.avatar = undefined;
            form?.clear();
          "
        >
          Cancel
        </UButton>
      </div>
    </UForm>
  </div>
</template>
