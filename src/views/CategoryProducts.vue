<template>
  <div>
    <h1 class="justify-center text-center">Products in {{ categoryName }}</h1>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-if="ProductsOfCategory.length === 0">
      <p class="justify-center text-center">
        No products found in category: <b>{{ categoryName }}</b
        >.
      </p>
    </div>
    <div v-else>
      <ProductCard :products="ProductsOfCategory"></ProductCard>
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
      ProductsOfCategory: [],
      loading: true,
    };
  },

  components: {
    ProductCard,
  },

  computed: {
    categoryName() {
      const categoryStore = useCategoryNameStore();
      return categoryStore.categoryName;
    },
  },

  created() {
    this.fetchProductsOfCategory();
  },

  watch: {
    // Whenever "$route.params.id" changes, the fetchProductsOfCategory method is called.
    "$route.params.id": "fetchProductsOfCategory",
  },

  methods: {
    async fetchProductsOfCategory() {
      this.loading = true;
      const categoryId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/categories/${categoryId}/products/`
        );
        this.ProductsOfCategory = response.data;
      } catch (error) {
        console.log(
          "Error fetching products:",
          error.response ? error.response.data : error.message
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
