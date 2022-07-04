<template>
  <div class="container">
    <el-container >
		<!-- 侧边导航栏 -->
		  <Nav :role = role />
      <el-container>
		  <!-- 头部面包屑 -->
		  <el-header>
			<div style="padding: 20px 0;">
				欢迎您！{{user}}
				<el-button class="quit" type="primary" style="float:right;" size="small" @click="quit">退出</el-button>
			<Breadcrumb />
			</div>
			
		</el-header>
        <el-main>
			<!-- 路由出口 -->
			<router-view />
		</el-main>
		<el-footer>医助手管理平台</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	import Nav from "../../components/Nav"
	import Breadcrumb from "../../components/Breadcrumb"
	//import global from "../../global/global"	//引入全局变量存储登录身份（0：医生，1：管理员）
	export default {
		data(){
			return{
				role:-1,
				user:''
			}
		},
		components:{
			Nav,
			Breadcrumb
		},
		created() {
			this.user = sessionStorage.getItem('u_name')
			this.role = sessionStorage.getItem('userRole');
			//this.role = this.$route.query.role;
			console.log(this.role)
		},
		beforeDestroy() {
			sessionStorage.clear()
		},
		methods:{
			quit(){
				sessionStorage.clear()
				this.$router.push('/login')
			}
			
		},
		
	}
	
</script>

<style>
	html,body,#app,.demo,.el-container{	
		height: 100%;
	}
	.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
	  
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
	  height: auto;
	padding: 5px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
	  height: 100%;
	  width: 100%;
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .container{
	  height: 100%;
  }
  .breadcrumb{
	  
  }
</style>