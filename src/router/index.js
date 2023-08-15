// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/front/HomeView.vue'),
        meta: {
          title: 'Taealam',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/front/RegisterView.vue'),
        meta: {
          title: 'Taealam | Sign-up',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/front/LoginView.vue'),
        meta: {
          title: 'Taealam | Login',
          login: false,
          admin: false
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/front/ProfileView.vue'),
        meta: {
          title: 'Taealam | Profile',
          login: true,
          admin: false
        }
      },
      {
        path: 'culture/:id',
        name: 'Culture Article',
        component: () => import(/* webpackChunkName: "cultureArticle" */ '@/views/front/CultureArticle.vue'),
        meta: {
          title: 'Taealam | Article',
          login: false,
          admin: false
        }
      },
      {
        path: 'culture',
        name: 'Culture',
        component: () => import(/* webpackChunkName: "cultureCorner" */ '@/views/front/CultureCorner.vue'),
        meta: {
          title: 'Taealam | Culture Corner',
          login: false,
          admin: false
        }
      },
      {
        path: 'courses',
        name: 'Courses',
        component: () => import(/* webpackChunkName: "courses" */ '@/views/front/CoursesView.vue'),
        meta: {
          title: 'Taealam | Courses',
          login: true,
          admin: false
        }
      },
      {
        path: 'courses/:id',
        name: 'Lesson',
        component: () => import(/* webpackChunkName: "lesson" */ '@/views/front/LessonView.vue'),
        meta: {
          title: 'Taealam | Lesson',
          login: true,
          admin: false
        }
      },
      {
        path: 'discussion',
        name: 'Discussion',
        component: () => import(/* webpackChunkName: "discussionBoard" */ '@/views/front/DiscussionBoard.vue'),
        meta: {
          title: 'Taealam | Discussion Board',
          login: false,
          admin: false
        }
      },
      {
        path: 'discussion/:id',
        name: 'Discussion Post',
        component: () => import(/* webpackChunkName: "discussionPost" */ '@/views/front/DiscussionPost.vue'),
        meta: {
          title: 'Taealam | Discussion Post',
          login: false,
          admin: false
        }
      },
      {
        path: 'aboutus',
        name: 'About Us',
        component: () => import(/* webpackChunkName: "aboutus" */ '@/views/front/AboutUsView.vue'),
        meta: {
          title: 'Taealam | About Us',
          login: false,
          admin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin/HomeView.vue'),
        meta: {
          title: 'Taealam | Admin Home',
          login: true,
          admin: true
        }
      },
      {
        path: 'courses',
        name: 'AdminCourses',
        component: () => import(/* webpackChunkName: "admin-courses" */ '@/views/admin/CoursesView.vue'),
        meta: {
          title: 'Taealam | Courses',
          login: true,
          admin: true
        }
      },
      {
        path: 'culture',
        name: 'AdminCulture',
        component: () => import(/* webpackChunkName: "admin-cultureCorner" */ '@/views/admin/CultureCorner.vue'),
        meta: {
          title: 'Taealam | Culture Corner',
          login: true,
          admin: true
        }
      },
      {
        path: 'discussion',
        name: 'AdminDiscussionBoard',
        component: () => import(/* webpackChunkName: "admin-discussionBoard" */ '@/views/admin/DiscussionBoard.vue'),
        meta: {
          title: 'Taealam | Discussion Board',
          login: true,
          admin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.afterEach((to, from) => {
  document.title = to.meta.title
})
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  // 剛進網頁時的第一次路由跳轉
  if (from === START_LOCATION) {
    // 取得使用者資訊
    await user.getProfile()
  }

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 如果有登入，去註冊或登入頁，導向回首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果沒登入，去需要登入的頁面，導向回登入頁
    next('login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果不是管理員，去需要管理員，導向回首頁
    next('/')
  } else {
    // 不做導向
    next()
  }
})
export default router
