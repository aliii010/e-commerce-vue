import { defineStore } from "pinia";
import axios from "../axios";

const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cart: null,
    };
  },

  actions: {
    async getCart() {
      const response = await axios.get("http://localhost:8000/api/cart/");
      this.cart = response.data;
    },
  },
});

export default useCartStore;
