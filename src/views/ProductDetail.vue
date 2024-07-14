<template>
  <div class="bg-white">
    <div class="pt-6">
      <!-- Image gallery -->
      <div
        class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
      >
        <div
          class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
        >
          <img
            :src="selectedItem.image || product.image"
            alt="Model wearing plain white basic tee."
            class="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <!-- Product info -->
      <div
        class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
      >
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {{ product.name }}
          </h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">
            ${{ selectedItem.price || product.base_price }}
          </p>

          <p class="text-red-800" v-if="isUnavailable">
            The product with the selected variations is unavailable
          </p>

          <form class="mt-10">
            <ProductVariations
              :product="product"
              :isUnavailable="isUnavailable"
              @update-selected-item="
                (newSelectedItem) => (selectedItem = newSelectedItem)
              "
              @update-availability="
                (availability) => (isUnavailable = availability)
              "
              @all-variation-selected="
                (allIsSelected) => (allVariationsSelected = allIsSelected)
              "
            ></ProductVariations>
            <button
              :class="{
                'opacity-50 cursor-not-allowed': isSelectedItemEmpty,
              }"
              :disabled="isSelectedItemEmpty"
              @click.prevent="addToCart(selectedItem.id)"
              class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
          </form>
        </div>

        <div
          class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
        >
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import ProductVariations from "@/components/ProductVariations.vue";
import { mapStores } from "pinia";
import useCartStore from "../stores/Cart";

export default {
  data() {
    return {
      product: {},
      selectedItem: {},
      loading: true,
      error: "",
      isUnavailable: false,
      allVariationsSelected: false,
    };
  },

  components: {
    ProductVariations,
  },

  computed: {
    ...mapStores(useCartStore),

    isSelectedItemEmpty() {
      return (
        !this.selectedItem ||
        Object.keys(this.selectedItem).length === 0 ||
        this.isUnavailable ||
        (this.selectedItem.variation_options.length > 0 &&
          !this.allVariationsSelected)
      );
    },
  },

  async created() {
    this.fetchProduct();
  },

  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}/`
        );
        this.product = response.data;
        this.selectedItem = this.product.default_product_item;
      } catch (error) {
        this.error = error.response.data;
      } finally {
        this.loading = false;
      }
    },

    addToCart(productItemId) {
      const postData = {
        product_item: productItemId,
        qty: 1,
      };

      axios
        .post("http://localhost:8000/api/cart/items/", postData)
        .then((response) => {
          alert("item added to your cart");
          this.cartStore.getCart();
        })
        .catch((error) => {
          let errorMessage = "";
          for (const [key, value] of Object.entries(error.response.data)) {
            errorMessage += `${key}: ${value}\n`;
          }
          alert(errorMessage.trim());
        });
    },
  },
};
</script>

<style scoped></style>
