import Vue from "vue";
import Router from "vue-router";
import Puzzle from "@/components/puzzle";
import Home from "@/components/home";
import Prize from "@/components/prize";

Vue.use(Router);

const routes = [
  {
    path: "*",
    name: "home",
    component: Home
  },
  {
    path: "/puzzleM/dist",
    name: "home",
    component: Home
  },
  {
    path: "/puzzleM/dist/puzzle",
    name: "puzzle",
    component: Puzzle
  },
  {
    path: "/puzzleM/dist/prize",
    name: "prize",
    component: Prize
  }
];

export default new Router({
  mode: "hash",
  // base:"/dist",
  routes,
  linkActiveClass: "active"
});
