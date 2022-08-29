import { createRouter, createWebHistory } from "vue-router";
import Cookie from "js-cookie";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import AdministratorLogin from "@/views/AdministratorLogin.vue";
import { PMHCrypto } from "@/methods/PMHCrypto";
import RouterError from "@/views/RouterError.vue";

const routes = [
  {
    path: "/route-error",
    name: "RouterError",
    component: RouterError,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/administrator/login",
    name: "AdministratorLogin",
    component: AdministratorLogin,
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/user/requests/list",
    name: "UserRequestList",
    component: () => import("../views/requests/User/UserRequestList.vue"),
  },
  {
    path: "/user/requests/new",
    name: "UserRequestNew",
    component: () => import("../views/requests/User/UserRequestNew.vue"),
  },
  {
    path: "/user/requests/show/:id",
    name: "UserRequestShow",
    component: () => import("../views/requests/User/UserRequestShow.vue"),
  },
  {
    path: "/administrator/requests/list",
    name: "AdministratorRequestList",
    component: () => import("../views/requests/Admin/AdministratorRequestList.vue"), // Listado de solicitudes
  },
  {
    path: "/administrator/requests/show/:id",
    name: "AdministratorRequestShow",
    component: () => import("../views/requests/Admin/AdministratorRequestShow.vue"), // Show de la solicitud en cuestión
  },
  {
    path: "/administrator/estadisticas/habitantes",
    name: "AdministratorHabitantes",
    component: () => import("../components/dashboard/AdministratorHabitantes.vue"),
  },
  {
    path: "/administrator/estadisticas/solicitudes",
    name: "AdministratorSolicitudes",
    component: () => import("../components/dashboard/AdministratorSolicitudes.vue"),
  },
  {
    path: "/administrator/estadisticas/heatmap",
    name: "AdministratorHeatmap",
    component: () => import("../components/dashboard/AdministratorHeatmap.vue"),
  },
  {
    path: "/FAQ",
    name: "FAQ",
    component: () => import("../views/FAQ.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* eslint-disable */
router.beforeEach((to, from, next) => {
  const session = Cookie.get("PMHSESSION");
  const { decrypt } = PMHCrypto();
  if (to.name === undefined) {
    next({ name: "RouterError" });
  }
  if (to.name === "Home" || to.name === "RouterError" || to.name === "FAQ") {
    next();
  } else {
    if (!session) {
      if (to.name.indexOf("Login") !== -1) {
        next();
      } else {
        next({ name: "RouterError" });
      }
    } else {
      const userRol = localStorage.getItem("USER_ROL");
      const salt = Cookie.get("SALT");
      let rol = decrypt(userRol, salt);
      if (to.name.toUpperCase().indexOf(rol) !== -1) {
        next();
      } else {
        if (to.name.indexOf("Login") !== -1) {
          next();
        } else {
          next({ name: "Home" });
        }
      }
    }
  }
});

export default router;
