<template>
  <!-- Variations -->
  <div v-for="variation in product.variations" :key="variation.id">
    <h3 class="text-sm font-medium text-gray-900 mb-2">{{ variation.name }}</h3>

    <fieldset
      aria-label="Choose a {{ variation.name.toLowerCase() }}"
      class="mt-4"
    >
      <div
        v-for="option in variation.options"
        :key="option.id"
        class="flex items-center space-x-3"
      >
        <label
          :for="option.value"
          :aria-label="option.value"
          class="flex items-center cursor-pointer"
          :class="{
            'text-gray-500': isOptionSelected(variation.id, option.id),
          }"
        >
          <input
            type="radio"
            :id="option.value"
            :name="variation.id"
            @change="onVariationChange(variation.id, option.id)"
            :value="option.value"
            class="sr-only"
          />
          <span
            aria-hidden="true"
            :class="{
              'block h-8 w-8 rounded-full border border-gray-300': true,
              'border-blue-800 border-2': isOptionSelected(
                variation.id,
                option.id
              ),
              'bg-blue-500': option.value === 'Blue',
              'bg-pink-500': option.value === 'Pink',
              'bg-[#9B9590]': option.value === 'Titanium Gray',
              // Add more color options here
            }"
          ></span>
          <span class="ml-2 text-sm">{{ option.value }}</span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return {
      productItems: null,
      selectedOptions: {},
    };
  },

  props: {
    product: Object,
    isUnavailable: Boolean,
  },

  emits: [
    "update-selected-item",
    "update-availability",
    "all-variation-selected",
  ],

  async created() {},

  methods: {
    onVariationChange(variationId, optionId) {
      this.selectedOptions[variationId] = optionId;
      this.getProductItems();
    },

    // get product items when a variation is selected (changed)
    async getProductItems() {
      const params = {
        product: this.product.id,
        options: Object.values(this.selectedOptions),
      };
      try {
        const response = await axios.get(
          `http://localhost:8000/api/filtered-product-items/`,
          { params }
        );
        if (response.data.length > 0) {
          this.productItems = response.data;
          this.$emit("update-selected-item", response.data[0]);
          this.$emit("update-availability", false);
          this.$emit("all-variation-selected", this.allVariationsSelected());
        } else {
          this.$emit("update-availability", true);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },

    allVariationsSelected() {
      return this.product.variations.every((variation) =>
        this.selectedOptions.hasOwnProperty(variation.id)
      );
    },

    isOptionSelected(variationId, optionId) {
      return (
        this.selectedOptions[variationId] &&
        this.selectedOptions[variationId] === optionId
      );
    },
  },
};
</script>

<style scoped></style>
