import Vue from "vue";
import Router, { Route } from "vue-router";
import Home from "@/views/Home.vue";
import List from "@/views/List.vue";
import User from "@/views/User.vue";
import Edit from "@/views/Edit.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (to.query.list) {
          next({ path: `/${to.query.list}` });
        } else {
          next();
        }
      }
    },
    {
      path: "/s/user",
      name: "user",
      component: User
    },
    {
      path: "/s/edit",
      name: "edit",
      component: Edit
    },
    {
      path: "/:id",
      name: "list",
      component: List
    }
    // {
    //   path: "/:id",
    //   name: "list",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     // import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

router.beforeEach((to: Route, from: Route, next: any) => {
  appInsights.trackPageView(to.fullPath);
  next();
});

export default router;
