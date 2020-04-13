import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home-view',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard-view',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(path => path.meta.requiresAuth)){
      const auth = store.state.auth
      console.log(auth)
      if(auth){
          next()
      }else{
          next({
              name: 'Home-view'
          })
      }
  }else{
      next()
  }
})

export default router;
