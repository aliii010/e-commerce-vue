<template>
  <div class="flex flex-wrap">
    <section class="relative mx-auto">
      <!-- navbar -->
      <nav class="flex justify-between bg-gray-900 text-white w-screen">
        <div
          class="px-5 xl:px-12 py-6 flex w-full items-center justify-between"
        >
          <RouterLink class="text-3xl font-thin font-heading" to="/">
            E-Commerce
          </RouterLink>
          <!-- Nav Links -->
          <ul
            class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 items-center"
          >
            <li class="relative">
              <a
                class="hover:text-gray-200 cursor-pointer"
                @click="toggleCategoriesDropdown"
                >Categories</a
              >
              <CategoriesDropDown
                v-if="isCategoriesDropDownOpen"
                @close-categories-dropdown="
                  (close) => (isCategoriesDropDownOpen = close)
                "
              ></CategoriesDropDown>
            </li>
            <li>
              <RouterLink class="hover:text-gray-200" to="/products"
                >All Products</RouterLink
              >
            </li>
            <!-- Search Bar -->
            <SearchBar></SearchBar>
          </ul>
          <!-- Header Icons -->
          <div class="flex space-x-5 items-center mr-5">
            <a
              class="relative flex items-center hover:text-gray-200 cursor-pointer"
              @click="openCart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div
                class="absolute bottom-3 left-4 flex items-center justify-center h-4 w-4 bg-red-600 text-white text-xs rounded-full"
                v-if="cartStore.cart"
              >
                {{ cartStore.cart.cart_items.length }}
              </div>
            </a>
            <!-- Sign In / Register -->
            <RouterLink v-if="!isAuthenticated" class="nav-link" to="/login"
              >Sign in</RouterLink
            >
            <a
              v-else
              class="flex cursor-pointer hover:text-gray-200"
              @click="toggleUserDropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="font-thin ml-2">{{ userStore.user.first_name }}</p>
              <!-- User drop down -->
              <UserDropDown v-if="isUserDropDownOpen"></UserDropDown>
            </a>
          </div>
        </div>
        <!-- Responsive navbar -->
        <!-- <ResponsiveNavBar></ResponsiveNavBar> -->
      </nav>
    </section>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import useUserStore from "../stores/User";
import useCartStore from "../stores/Cart";
import UserDropDown from "../components/UserDropDown.vue";
import SearchBar from "../components/SearchBar.vue";
import ResponsiveNavBar from "../components/ResponsiveNavBar.vue";
import CategoriesDropDown from "../components/CategoriesDropDown.vue";

export default {
  data() {
    return {
      isUserDropDownOpen: false,
      isCategoriesDropDownOpen: false,
    };
  },

  components: {
    UserDropDown,
    SearchBar,
    ResponsiveNavBar,
    CategoriesDropDown,
  },

  computed: {
    ...mapStores(useUserStore),
    ...mapStores(useCartStore),

    isAuthenticated() {
      return Boolean(localStorage.getItem("access"));
    },
  },

  emits: ["open-cart"],

  methods: {
    toggleUserDropdown() {
      this.isUserDropDownOpen = !this.isUserDropDownOpen;
    },
    toggleCategoriesDropdown() {
      this.isCategoriesDropDownOpen = !this.isCategoriesDropDownOpen;
    },
    openCart() {
      this.$emit("open-cart");
    },
  },

  created() {
    if (this.isAuthenticated) {
      this.userStore.getUser();
      this.cartStore.getCart();
    }
  },
};
</script>

<style></style>
