<template>
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="v.path" v-for="(v,i) in list" :key="i">
		  {{v.name}}
	  </el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
				
			}
		},
		created() {
			console.log(this.$route.matched)
			this.list = this.$route.matched
		},
		watch:{	//监听路由
			$route(to,from){
				console.log(to)	//to $route对象
				let matched = to.matched;
				this.list = matched;
			}
			
		}
	}
</script>

<style>
</style>
