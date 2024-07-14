import { createRouter, createWebHistory } from "vue-router";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import Products from "@/views/Products.vue";
import Cart from "@/views/Cart.vue";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Activation from "@/views/Activation.vue";
import CategoryProducts from "@/views/CategoryProducts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        hideNavBar: true,
      },
    },
    {
      path: "/activate/:uid/:token",
      name: "activation",
      component: Activation,
      meta: {
        hideNavBar: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        hideNavBar: true,
      },
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/categories/:id/products",
      name: "category-products",
      component: CategoryProducts,
    },
    {
      path: "/products/:id",
      name: "ProductDetail",
      component: ProductDetail,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
  ],
});

export default router;
