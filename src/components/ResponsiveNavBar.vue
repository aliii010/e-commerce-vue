<template>
  <div class="flex items-center mr-5">
    <RouterLink
      v-if="!isAuthenticated"
      class="mr-6 xl:hidden flex items-center hover:text-gray-200 whitespace-nowrap cursor-pointer"
      to="/login"
    >
      Sign in
    </RouterLink>
    <a
      v-else
      class="xl:hidden flex mr-6 items-center cursor-pointer"
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
    </a>

    <!-- User Dropdown -->
    <UserDropDown v-if="isUserDropDownOpen"></UserDropDown>

    <a
      @click="openResponsiveNavBar"
      class="navbar-burger self-center xl:hidden cursor-pointer"
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </a>
  </div>

  <ResponsiveNAvBarMenu
    v-if="isResponsiveNavBarMenuOpen"
    @close-responsive-navbar-menu="
      (close) => (isResponsiveNavBarMenuOpen = close)
    "
  ></ResponsiveNAvBarMenu>
</template>

<script>
import UserDropDown from "./UserDropDown.vue";
import ResponsiveNAvBarMenu from "./ResponsiveNavBarMenu.vue";

export default {
  data() {
    return {
      isUserDropDownOpen: false,
      isResponsiveNavBarMenuOpen: false,
    };
  },

  components: {
    UserDropDown,
    ResponsiveNAvBarMenu,
  },

  computed: {
    isAuthenticated() {
      return Boolean(localStorage.getItem("access"));
    },
  },

  methods: {
    toggleUserDropdown() {
      this.isUserDropDownOpen = !this.isUserDropDownOpen;
    },

    openResponsiveNavBar() {
      this.isResponsiveNavBarMenuOpen = true;
    },
  },
};
</script>

<style></style>
