<template>
  <NavBar v-if="!$route.meta.hideNavBar" @open-cart="openCart" />
  <Cart v-if="showCart" @close-cart="(close) => (showCart = close)"></Cart>

  <RouterView />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Cart from "./views/Cart.vue";

export default {
  data() {
    return {
      showCart: false,
    };
  },

  components: {
    NavBar,
    Cart,
  },

  methods: {
    openCart() {
      this.showCart = true;
    },
  },
};
</script>

<style scoped></style>
