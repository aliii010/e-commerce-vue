import { defineStore } from "pinia";

const useCategoryNameStore = defineStore('CategoryName', {
  state: () => {
    return {
      categoryName: null
    }
  },

  actions: {
    async setCategoryName(CategoryName) {
      this.categoryName = CategoryName;
    }
  }
})

export default useCategoryNameStore;