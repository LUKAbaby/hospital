import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name:'Login',
    redirect:'/login'
  },
  {
    path: '/home',
    name:'首页',
    component:()=>import('../views/home/home.vue'),
	children:[
		{
			path:'/home/index',
			name:'首页',
			component:()=>import('../views/home/index.vue')
		},
		{
			path:'/home/admin',
			name:'Admin',
			component:()=>import('../views/home/admin.vue'),
			children:[
				{
					path:'/home/admin/user',
					name:'用户信息',
					component:()=>import('../views/home/userinfo.vue'),
				},
				{
					path:'/home/admin/doctor',
					name:'医生信息',
					component:()=>import('../views/home/docinfo.vue'),
				},
				{
					path:'/home/admin/hospital_dep',
					name:'科室信息',
					component:()=>import('../views/home/hospital_dep.vue'),
				},
				{
					path:'/home/admin/admin_manager',
					name:'高级',
					component:()=>import('../views/home/admin_Manager.vue'),
				}
			]
		},
		{
			path:'/home/appointment',
			name:'预约信息',
			component:()=>import('../views/home/appointment.vue'),
			children:[
				{
					path:'/home/appointmentinfo',
					name:'全部预约',
					component:()=>import('../views/home/appointmentinfo.vue'),
				},
				{
					path:'/home/appointment_todo',
					name:'待处理预约',
					component:()=>import('../views/home/appointment_todo.vue')
				}
			]
		},
		{
			path:'/home/personal',
			name:'个人信息',
			component:()=>import('../views/home/personalinfo.vue')
		},
		{
			path:'/home/more',
			name:'更多',
			component:()=>import('../views/home/more.vue')
		}
		
	]
  },
  {
    path: '/login',
    name: 'Login',
	//懒加载配置
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function(to,from,next){
	if(!sessionStorage.getItem('u_name')){
		if(to.path !== '/login'){
			next('/login')
		}
	}
	next()
})

export default router
