<template>
  <div
    class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  >
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="group relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <div class="h-64 w-full overflow-hidden bg-gray-200">
          <img
            :src="product.image"
            alt="Product image"
            class="h-full w-full object-cover object-center transition-opacity duration-300"
          />
        </div>
        <div class="p-4">
          <h3 class="text-2xl text-gray-700 font-bold text-start">
            <a href="#">
              {{ product.name }}
            </a>
          </h3>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-lg font-bold text-gray-900">
              ${{ product.base_price }}
            </p>
            <button
              @click="goToDetails(product.id, product.name)"
              class="bg-gray-900 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition-colors duration-300"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  methods: {
    goToDetails(productId, productName) {
      this.$router.push({
        name: "ProductDetail",
        params: {
          id: productId,
        },
      });
    },
  },
};
</script>

<style></style>
