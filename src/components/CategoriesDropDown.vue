<template>
  <div class="dropdown-menu absolute left-[-60px] top-[16px] mt-2 w-48 z-50">
    <div
      class="bg-white rounded-lg shadow-xl px-4 relative mt-8"
      @mouseleave="hoveredParent = null"
    >
      <div
        v-for="category in parentCategories"
        :key="category.id"
        class="py-3 flex items-center w-full hover:bg-gray-50 border-t border-gray-200"
        @mouseover="hoveredParent = category.id"
      >
        <a href="#" class="flex-1">
          <div class="text-gray-400 text-base">
            {{ category.category_name }}
          </div>
        </a>
        <div>
          <svg
            width="40"
            height="20"
            viewBox="0 0 40 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="30" y1="2" x2="40" y2="10" stroke="#9CA3AF" />
            <line x1="30" y1="18" x2="40" y2="10" stroke="#9CA3AF" />
            <line x1="20" y1="10" x2="40" y2="10" stroke="#9CA3AF" />
          </svg>
        </div>

        <div
          v-if="hoveredParent === category.id"
          class="bg-white rounded-lg shadow-xl h-full px-4 absolute top-[-32px] left-[192px] mt-8"
        >
          <div
            v-for="childCategory in getChildCategories(category.id)"
            :key="childCategory.id"
            class="py-3 flex items-center w-full hover:bg-gray-50 border-t border-gray-200"
          >
            <a
              @click="
                goToCategory(childCategory.id, childCategory.category_name)
              "
              class="flex-1 cursor-pointer"
            >
              <div class="text-gray-400 text-base">
                {{ childCategory.category_name }}
              </div>
            </a>
            <div>
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import useCategoryNameStore from "../stores/CategoryName";

export default {
  data() {
    return {
      categories: null,
      hoveredParent: null,
    };
  },

  computed: {
    parentCategories() {
      return (
        this.categories?.filter(
          (category) => category.parent_category === null
        ) || []
      );
    },
  },

  emits: ["close-categories-dropdown"],

  created() {
    this.fetchCategories();
  },

  methods: {
    async fetchCategories() {
      const response = await axios.get("http://localhost:8000/api/categories/");
      this.categories = response.data;
    },

    getChildCategories(parentCategoryId) {
      return (
        this.categories?.filter(
          (category) => category.parent_category === parentCategoryId
        ) || []
      );
    },

    goToCategory(categoryId, categoryName) {
      const categoryStore = useCategoryNameStore();
      categoryStore.setCategoryName(categoryName);
      this.$router.push({
        name: "category-products",
        params: { id: categoryId },
      });
      this.$emit("close-categories-dropdown", false);
    },
  },
};
</script>

<style></style>
