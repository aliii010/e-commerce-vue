import { defineStore } from "pinia";
import axios from "../axios";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: "",
    };
  },

  actions: {
    async getUser() {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/users/me/"
        );
        this.user = response.data;
      } catch (error) {
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          localStorage.removeItem("access");
          alert("Token is invalid or expired. Please log back in.");
          window.location.href = "/login";
        }
      }
    },
  },
});

export default useUserStore;
