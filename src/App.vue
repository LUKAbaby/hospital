<template>
  <div id="app">
	  <!-- 路由入口 -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script type="text/javascript">
	export default{
		name: 'App',
		  provide () {
		    return {
		      reload: this.reload
		    }
		  },
		  data () {
		    return {
		      isRouterAlive: true
		    }
		  },
	methods:{
		onbeforeunload:()=>{
			
		},
		reload () {
		      this.isRouterAlive = false
		      this.$nextTick(function() {
		         this.isRouterAlive = true
				 console.log("页面刷新")
		      })
		    }
		}
	}
</script>
<style>
	html,body{
		width: 100%;
		height: 100%;
		margin: 0px;
		padding: 0px;
		box-sizing: border-box;
	}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
