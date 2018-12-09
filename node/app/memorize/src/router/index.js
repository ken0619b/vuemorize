import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import firebase from 'firebase'

Vue.use(Router)

let router =  new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: 'signin'
    // },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } //認証が必要なページの場合に追加
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth) //metaで認証必要と定義しているケース
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) { //認証を確認
      if (user) {
        //認証済の場合
        next()
      } else {
        //未ログイン
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() //認証不要の場合は常にルーティングさせる
  }
})


export default router
