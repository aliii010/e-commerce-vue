<template>
  <div class="home">
    <div class="featured-products">
      <h2
        class="text-2xl font-bold tracking-tight text-gray-900 justify-center text-center"
      >
        Featured products
      </h2>
      <ProductCard :products="featuredProducts"></ProductCard>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import ProductCard from "@/components/ProductCard.vue";
import useCategoryNameStore from "../stores/CategoryName";

export default {
  data() {
    return {
      featuredProducts: null,
    };
  },

  components: {
    ProductCard,
  },

  created() {
    this.fetchFeaturedProducts();
  },

  methods: {
    async fetchFeaturedProducts() {
      const response = await axios.get(
        "http://localhost:8000/api/featured-products/"
      );
      this.featuredProducts = response.data;
    },
  },
};
</script>

<style scoped></style>
