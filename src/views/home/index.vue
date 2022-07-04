<template>
	<div id="main">
		<h1>欢迎使用医助手管理平台</h1>
		<template>
		  <el-carousel :style="{marginTop: '20px'}" :interval="4000" type="card" height="400px">
		    <el-carousel-item >
		      <!-- <h3 class="medium"></h3> -->
			  <img src="../../assets/hospital1.jpg" alt="image" style="width: auto;height: auto;max-width: 95%;max-height: 95%;"/>
		    </el-carousel-item>
			<el-carousel-item >
			  <!-- <h3 class="medium"></h3> -->
			  <img src="../../assets/hospital2.jpg" alt="image" style="width: auto;height: auto;max-width: 95%;max-height: 95%;"/>
			</el-carousel-item>
			<el-carousel-item >
			  <!-- <h3 class="medium"></h3> -->
			  <img src="../../assets/hospital3.jpg" alt="image" style="width: auto;height: auto;max-width: 100%;max-height: 95%;"/>
			</el-carousel-item>
			<el-carousel-item >
			  <!-- <h3 class="medium"></h3> -->
			  <img src="../../assets/bg1.jpg" alt="image" style="width: auto;height: auto;max-width: 100%;max-height: 95%;"/>
			</el-carousel-item>
			<el-carousel-item >
			  <!-- <h3 class="medium"></h3> -->
			  <img src="../../assets/bg2.jpg" alt="image" style="width: auto;height: auto;max-width: 100%;max-height: 95%;"/>
			</el-carousel-item>
			<el-carousel-item >
			  <!-- <h3 class="medium"></h3> -->
			  <img src="../../assets/bg3.jpg" alt="image" style="width: auto;height: auto;max-width: 100%;max-height: 95%;"/>
			</el-carousel-item>
		  </el-carousel>
		</template>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				image:[
					'../../assets/bg1.jpg',
					'../../assets/bg2.jpg',
					'../../assets/bg3.jpg',
					'../../assets/hospital1.jpg',
					'../../assets/hospital2.jpg',
					'../../assets/hospital3.jpg',
				],
				
			}
		},
		
	}
</script>
<style>
		 .el-carousel__item h3 {
		    color: #475669;
		    font-size: 14px;
		    opacity: 0.75;
		    line-height: 200px;
		    margin: 0;
		  }
		  
		  .el-carousel__item:nth-child(2n) {
		    /* background-color: #99a9bf; */
		  }
		  
		  .el-carousel__item:nth-child(2n+1) {
		    /* background-color: #d3dce6; */
		  }
		</style>
