<template>
  <li class="relative flex-grow">
    <input
      type="text"
      placeholder="Search for products"
      class="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-32 md:w-48 lg:w-64 xl:w-80 transition-width duration-300 ease-in-out"
    />
    <button class="absolute right-2 top-2 text-gray-500 hover:text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </li>
</template>

<script>
export default {};
</script>

<style></style>
