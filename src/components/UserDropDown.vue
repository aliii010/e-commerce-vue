<template>
  <div
    class="dropdown-menu absolute right-10 top-20 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
  >
    <div class="bg-white rounded-lg shadow-xl px-4 py-6">
      <div
        class="flex p-1 items-center w-full border-gray-200 hover:bg-gray-100"
      >
        <a href="#" class="flex-1">
          <div class="text-gray-400 text-base" @click="logout">Sign out</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("access");
      window.location.reload();
    },
  },
};
</script>

<style scoped></style>
