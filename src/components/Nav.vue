<template>
	<el-aside width="200px">
	<el-menu
	      :default-active=active
	      class="el-menu-vertical-demo"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b" router>
			<!-- 子级菜单 -->
			<el-menu-item index="/home/index">
			  <i class="el-icon-menu"></i>
						<span slot="title">首页</span>
			</el-menu-item>
	      <el-submenu index="/home/admin"  v-if="role == 1">
	        <template slot="title">
	          <i class="el-icon-s-custom"></i>
	          <span>管理员</span>
	        </template>
	        <el-menu-item-group>
	          <template slot="title"></template>
	          <el-menu-item index="/home/admin/user">
				  <i class="el-icon-notebook-1"></i>用户信息</el-menu-item>
	          <el-menu-item index="/home/admin/doctor">
				  <i class="el-icon-notebook-2"></i>医生信息</el-menu-item>
	        </el-menu-item-group>
			<el-menu-item-group>
	        <el-submenu index="1-3">
				<template slot="title"><i class="el-icon-link"></i>医院管理</template>
	          <el-menu-item index="/home/admin/hospital_dep">科室信息</el-menu-item>
	        </el-submenu>
	        <el-submenu index="1-4">
	          <template slot="title">管理员</template>
	          <el-menu-item index="/home/admin/admin_manager">高级</el-menu-item>
	        </el-submenu>
	      </el-menu-item-group></el-submenu>
		  
		  <el-menu-item-group>
		  <el-submenu index="1-5">
			<template  slot="title"><i class="el-icon-files"></i>预约信息</template>
			<el-menu-item index="/home/appointmentinfo">
			  <i class="el-icon-s-order"></i>
				<span slot="title">全部预约</span>
			</el-menu-item>
			<el-menu-item index="/home/appointment_todo">
				<i class="el-icon-s-operation"></i>
				<span slot="title">待处理预约</span>
			</el-menu-item>
	      </el-submenu>
		  </el-menu-item-group>
	      <el-menu-item index="/home/personal">
	        <i class="el-icon-document"></i>
	        <span slot="title">个人信息</span>
	      </el-menu-item>
	      <el-menu-item index="/home/more">
	        <i class="el-icon-more"></i>
	        <span slot="title">&nbsp;&nbsp;更多&nbsp;&nbsp;</span>
	      </el-menu-item>
	    </el-menu>
		</el-aside>
</template>

<script>
	
	export default{
		data(){
			return{
				active:'/home/index'
				
			}
			
		},
		props:{
			role: Number	//父传子参数设置
	},
	created() {
		console.log(this.$route.path)
		 this.active = this.$route.path
		//console.log(this.r)
	},
	watch:{
		$route(next,old){
			//console.log(next)
			this.active = next.path
		}
	}
		
	}

</script>

<style>
</style>
