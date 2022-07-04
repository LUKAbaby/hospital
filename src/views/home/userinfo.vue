<template>
	<!-- <h1>用户信息</h1> -->
	<!-- 用户信息 -->
	<div >
		<el-table
	    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
	    style="width: 100%;"
		:header-cell-style="{padding:'0',height:'50px',textAlign:'center'}"
		:cell-style="{textAlign:'center'}"
		>
	    <el-table-column
		fixed="left"
	      label="序号"
	      prop="id"
		  >
	    </el-table-column>
		
		<el-table-column
		  label="用户头像"
		  prop="avatarUrl"
		  >
		  <template slot-scope="scope">
		  	<img :src="scope.row.avatarUrl" style="width: auto;height: auto;max-width: 30%;max-height: 30%;border-radius: 10px;" />
		  </template>
	    </el-table-column>
		
		<el-table-column
		  label="用户昵称"
		  prop="userNickname"
		  >
		</el-table-column>
		<el-table-column
		  label="性别"
		  prop="gender"
		  >
		  <template slot-scope="scope">
			  {{scope.row.gender == 1?'女':'男'}}
		  </template>
		</el-table-column>
		<el-table-column
		  label="联系电话"
		  prop="userPhone"
		  >
		</el-table-column>
		<el-table-column
		  label="账户余额"
		  prop="money"
		  >
		</el-table-column>
		<el-table-column
		  label="OpenId"
		  prop="openid"
		  >
		</el-table-column>
		<el-table-column width="200px" label="操作">
		      <template slot-scope="scope">
				  <el-popover
				    placement="right"
				    width="750"
				    trigger="manual"
					v-model="visible && index == scope.$index">
				    <el-table v-loading="loading" :data="gridData" :header-cell-style="{textAlign:'center'}"
					:cell-style="{textAlign:'center'}" max-height="300px">
					  <el-table-column width="150" property="depId" label="科室ID"></el-table-column>
					  <el-table-column width="150" property="appointDocId" label="预约医生"></el-table-column>
				      <el-table-column width="150" property="appointFee" label="预约费用"></el-table-column>
				      <el-table-column width="100" property="appointDate" label="预约日期"></el-table-column>
				      <el-table-column width="300" property="createTime" label="创建日期">
						<template slot-scope="scope">
							{{formateTime(new Date(scope.row.createTime))}}
						</template>  
					  </el-table-column>
				    </el-table>
				    <el-button slot="reference"  size="mini"
		          @click="handleShow(scope.$index, scope.row)">查看预约</el-button>
				  </el-popover>
				  &emsp;
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		
		<!-- 分页器 -->
		<div class="block" style="float:right">
		              <span class="demonstration"></span>
		              <el-pagination @size-change="handleSizeChange"
		              @current-change="handleCurrentChange"
		              :current-page="currentPage"
		              :page-sizes="pageSizes"
		              :page-size="pageSize"
		              background
		              layout="total, sizes, prev, pager, next, jumper"
		              :total="total">
		</el-pagination>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				tableData:[],
				gridData:[],
				pageData:[],
				visible:false,
				index:-1,
				loading:true,
				
				pageSize: 10,
				pageSizes: [5, 10, 15, 20, 30, 40, 50], // select选项设置：条/页
				currentPage: 1,
				total: 100,
				
			}
		},
		methods:{
			formateTime(date, delimiter = '-'){
				const yyyy = date.getFullYear().toString(); 
					const mm = (date.getMonth() + 1).toString();
					const dd = date.getDate().toString();
					const HH = date.getHours().toString();
					const minute = date.getMinutes().toString()
					const second = date.getSeconds().toString()
					return yyyy + delimiter + (mm[1] ? mm : `0${mm[0]}`)
						+ delimiter + (dd[1] ? dd : `0${dd[0]}`)+
						" "+(HH[1]?HH:`0${HH[0]}`)+":"+(minute[1]?minute:`0${minute[0]}`)+":"+
						(second[1]?second:`0${second[0]}`);
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.total = Math.ceil(this.tableData.length / val) +1
			      
			  },
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			handleShow(index,row){
				
				if(this.visible == false){
						this.gridData = []
						setTimeout(()=>{
							this.$http.get("/apt_api/getRecordByUser",{params:{id:row.id}}).then(res=>{
							this.gridData = res.data.data.record
							this.loading = false
						},1500)
						
					})
				}
				this.index = index
				this.visible = !this.visible
				
			},
			handleDelete(index,row){
				this.$confirm('此操作将永久删除用户：'+row.userNickname+', 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.$http({
						method:'post',
						url:"/user_api/delUserById",
						params:{
							id:row.id
						}
					}).then(res=>{
						if(res.data.code == 0){
							this.$message({
								type: 'success',
								message: res.data.data.result
							});
							location.reload(true)
						}else{
							this.$message({
								type: 'warning',
								message: res.data.data.result
							});
						}
					}).catch(e=>{
						this.$message({
							type: 'error',
							message: '服务器错误！'
						});  
					})
				  
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			
		},
		created() {
			this.$http.get("/user_api/userInfo").then(res =>{
				this.tableData = res.data.data.userInfo
				console.log(res.data)
				
			})
		}
		
	}
</script>

<style>

</style>
