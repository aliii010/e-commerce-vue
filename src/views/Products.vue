<template>
  <div class="product-list">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
    <div class="products">
      <ProductCard :products="products"></ProductCard>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import ProductCard from "../components/ProductCard.vue";
export default {
  data() {
    return {
      products: [],
    };
  },

  async created() {
    const response = await axios.get("http://localhost:8000/api/products/");
    this.products = response.data;
  },

  components: {
    ProductCard,
  },
};
</script>

<style>
.product-list {
  max-width: 1200px;
  margin: auto;
  padding: 1em;
}
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
