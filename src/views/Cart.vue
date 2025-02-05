<template>
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            >
              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2
                    class="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>

                  <div v-if="loading">Loading...</div>
                  <div v-if="error" class="text-red-700">{{ error }}</div>

                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span
                        @click="closeCart"
                        class="absolute -inset-0.5"
                      ></span>
                      <span class="sr-only">Close panel</span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <ul
                      v-if="cartItems.length > 0"
                      role="list"
                      class="-my-6 divide-y divide-gray-200"
                    >
                      <li
                        v-for="item in cartItems"
                        :key="item.id"
                        class="flex py-6"
                      >
                        <div
                          class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                        >
                          <img
                            :src="item.product_item.image"
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            class="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div
                              class="flex justify-between text-base font-medium text-gray-900"
                            >
                              <h3>
                                <a href="#">{{
                                  item.product_item.product.name
                                }}</a>
                              </h3>
                              <p class="ml-4">
                                Unit: <b>${{ item.product_item.price }}</b>
                              </p>
                            </div>
                            <p
                              v-for="option in item.product_item
                                .variation_options"
                              :key="option.id"
                              class="mt-1 text-sm text-gray-500"
                            >
                              {{ option.value }}
                            </p>
                          </div>
                          <div
                            class="flex flex-1 items-end justify-between text-sm"
                          >
                            <p class="text-gray-500">Qty {{ item.qty }}</p>

                            <div class="flex">
                              <button
                                @click="removeFromCart(item.id)"
                                type="button"
                                class="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div
                      v-else-if="!loading && !error"
                      class="flex items-center justify-center h-full"
                    >
                      <p class="text-lg font-semibold text-gray-700">
                        Your cart is empty.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div
                  class="flex justify-between text-base font-medium text-gray-900"
                >
                  <p>Subtotal</p>
                  <p>${{ CartTotalPrice }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div class="mt-6">
                  <a
                    @click="checkout"
                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >Checkout</a
                  >
                </div>
                <div
                  class="mt-6 flex justify-center text-center text-sm text-gray-500"
                >
                  <p>
                    or
                    <button
                      @click="closeCart"
                      type="button"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import { mapStores } from "pinia";
import useCartStore from "../stores/Cart";

export default {
  data() {
    return {
      cartItems: [],
      CartTotalPrice: 0,
      loading: true,
      error: null,
    };
  },

  computed: {
    ...mapStores(useCartStore),
  },

  emits: ["close-cart"],

  methods: {
    async fetchCartData() {
      try {
        const response = await axios.get("http://localhost:8000/api/cart/");
        const cart = response.data;
        this.CartTotalPrice = cart.total_price;
        const cartItemPromises = cart.cart_items.map((url) => axios.get(url));
        const cartItemResponses = await Promise.all(cartItemPromises);
        this.cartItems = cartItemResponses.map((response) => response.data);
      } catch (error) {
        this.error = "Failed to load cart data.";
      } finally {
        this.loading = false;
      }
    },
    async removeFromCart(itemId) {
      const response = await axios.delete(
        `http://localhost:8000/api/cart/items/${itemId}/`
      );
      this.cartItems = response.data;
      this.cartStore.getCart();
    },
    checkout() {
      alert("Checkout is not implemented yet.");
    },

    closeCart() {
      this.$emit("close-cart", false);
    },
  },

  async created() {
    this.fetchCartData();
  },
};
</script>

<style scoped>
.cart {
  max-width: 1200px;
  margin: auto;
  padding: 1em;
}
.cart-items {
  display: flex;
  flex-direction: column;
}
.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1em;
  padding: 1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.cart-item-img {
  width: 100px;
  height: auto;
  object-fit: cover;
  margin-right: 1em;
  border-radius: 5px;
}
.cart-item-info {
  flex: 1;
}
.cart-item-price {
  font-size: 1.2em;
  color: #007bff;
  font-weight: bold;
}
.cart-total {
  text-align: right;
  margin-top: 1em;
}
button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
