<template>
	<div>
		<el-tabs type="border-card" @tab-click="handleClick">
		  <el-tab-pane>
		    <span slot="label"><i class="el-icon-date"></i> 待处理预约(ABOUT ME)</span>
		<template>
			<el-table
			    :data="aptData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
			    style="width: 100%"
				:empty-text="暂无数据"
				:header-cell-style="{textAlign:'center'}"
				:cell-style="{textAlign:'center'}"
			    max-height="650">
			    <el-table-column
			      fixed
			      prop="id"
			      label="序号"
			      width="80">
			    </el-table-column>
				<el-table-column
				  fixed
				  prop="appointNo"
				  label="预约编号"
				  width="200">
				</el-table-column>
			    <el-table-column
			      prop="userName"
			      label="预约姓名"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="userPhone"
			      label="联系电话"
			      width="120">
			    </el-table-column>
			    <el-table-column
					sortable
					prop="appointDocId"
					label="预约医生"
					width="100">
			    </el-table-column>
			    <el-table-column
					sortable
			      prop="depId"
			      label="预约科室"
			      width="100">
			    </el-table-column>
				<el-table-column
				sortable
				  prop="appointDate"
				  label="预约日期"
				  width="120">
				</el-table-column>
				<el-table-column
				  prop="appointTime"
				  label="预约时间"
				  width="120">
				</el-table-column>
				<el-table-column
				  prop="isChild"
				  label="儿童预约"
				  width="80">
				</el-table-column>
				<el-table-column
				  prop="childName"
				  label="儿童姓名"
				  width="120">
				</el-table-column>
				<el-table-column
				  prop="childBirthday"
				  label="儿童出生日期"
				  width="120">
				</el-table-column>
			    <el-table-column
				sortable
			      prop="appointFee"
			      label="预约费用"
			      width="100">
			    </el-table-column>
				<el-table-column
				sortable
				  prop="createTime"
				  label="创建时间"
				  width="150">
				  <template slot-scope="scope">
				  	{{formateTime(new Date(scope.row.createTime))}}
				  </template>
				</el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="180">
			      <template slot-scope="scope">
					  <el-button
					    @click.native.prevent="finishApt(scope.$index, scope.row)"
					    type="text"
					    size="small">
					    病人已就诊
					  </el-button>
					  <el-button
					    @click.native.prevent="outApt(scope.$index, scope.row)"
					    type="text"
						style="color: firebrick;"
					    size="small">
					    超时失效
					  </el-button>
			        <el-button
			          @click.native.prevent="showRow(scope.$index, scope)"
			          type="text"
			          size="small">
			          查看
			        </el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			</template>
		  </el-tab-pane>
		<el-tab-pane><span slot="label"><i class="el-icon-finished"></i> 已结束预约(FINISHED)</span>
		  <template>
		  <el-table
		    :data="aptData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
		    style="width: 100%"
		  	:empty-text="暂无数据"
		  	:header-cell-style="{textAlign:'center'}"
		  	:cell-style="{textAlign:'center'}"
		      max-height="650">
		      <el-table-column
		        fixed
		        prop="id"
		        label="序号"
		        width="80">
		      </el-table-column>
		  	<el-table-column
		  	  fixed
		  	  prop="appointNo"
		  	  label="预约编号"
		  	  width="200">
		  	</el-table-column>
		      <el-table-column
		        prop="userName"
		        label="预约姓名"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="userPhone"
		        label="联系电话"
		        width="120">
		      </el-table-column>
		      <el-table-column
		  		sortable
		  		prop="appointDocId"
		  		label="预约医生"
		  		width="100">
		      </el-table-column>
		      <el-table-column
		  		sortable
		        prop="depId"
		        label="预约科室"
		        width="100">
		      </el-table-column>
		  	<el-table-column
		  	sortable
		  	  prop="appointDate"
		  	  label="预约日期"
		  	  width="120">
		  	</el-table-column>
		  	<el-table-column
		  	  prop="appointTime"
		  	  label="预约时间"
		  	  width="120">
		  	</el-table-column>
		  	<el-table-column
		  	  prop="isChild"
		  	  label="儿童预约"
		  	  width="80">
		  	</el-table-column>
		  	<el-table-column
		  	  prop="childName"
		  	  label="儿童姓名"
		  	  width="120">
		  	</el-table-column>
		  	<el-table-column
		  	  prop="childBirthday"
		  	  label="儿童出生日期"
		  	  width="120">
		  	</el-table-column>
		      <el-table-column
		  	sortable
		        prop="appointFee"
		        label="预约费用"
		        width="100">
		      </el-table-column>
		  	<el-table-column
		  	sortable
		  	  prop="createTime"
		  	  label="创建时间"
		  	  width="150">
		  	  <template slot-scope="scope">
		  	  	{{formateTime(new Date(scope.row.createTime))}}
		  	  </template>
		  	</el-table-column>
		      <el-table-column
		        fixed="right"
		        label="操作"
		        width="120">
		        <template slot-scope="scope">
		          <el-button
		            @click.native.prevent="showRow(scope.$index, scope)"
		            type="text"
		            size="small">
		            查看
		          </el-button>
		        </template>
		      </el-table-column>
		    </el-table>
		  </template></el-tab-pane>
		</el-tabs>
		
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
		<!-- 抽屉 -->
		<div class="drawer">
			<el-drawer
			  title="查看"
			  :visible.sync="drawer"
			  :direction="rtl"
			  :before-close="handleClose">
			  <div>
			  	<el-descriptions :title="'预约编号：'+drawerData.appointNo" direction="vertical" :column="4" :contentStyle="{tetxAlign:'center'}" border>
			  	  <el-descriptions-item label="序号">{{drawerData.id}}</el-descriptions-item>
			  	  <el-descriptions-item label="预约姓名">{{drawerData.userName}}</el-descriptions-item>
			  	  <el-descriptions-item label="联系电话">{{drawerData.userPhone}}</el-descriptions-item>
				  <el-descriptions-item label="预约医生">{{drawerData.appointDocId}}</el-descriptions-item>
				  <el-descriptions-item label="预约科室">{{drawerData.depId}}</el-descriptions-item>
				  <el-descriptions-item span="2" label="预约日期">{{drawerData.appointDate}}</el-descriptions-item>
				  <el-descriptions-item label="预约时间">{{drawerData.appointTime}}</el-descriptions-item>
				  <el-descriptions-item label="儿童预约">{{drawerData.isChild == 1? '是':'否'}}</el-descriptions-item>
				  <el-descriptions-item label="儿童姓名">{{drawerData.childName}}</el-descriptions-item>
				  <el-descriptions-item label="预约费用">{{drawerData.appointFee}}</el-descriptions-item>
				  <el-descriptions-item span="2" label="创建时间">{{formateTime(new Date(drawerData.createTime))}}</el-descriptions-item>
			  	  <el-descriptions-item span="2" label="订单状态"><el-tag size="small">{{drawerData.recordStatus}}</el-tag> <p>Tips:1为已支付且待完成，2为已完成，3为退款中，4为已退款</p></el-descriptions-item>
			  	</el-descriptions>
			  </div>
			</el-drawer>
		</div>
	</div>
</template>

<script>
	export default{
		inject:['reload'],
		data(){
			return{
				aptInfo:[],
				aptData:[],
				drawerData:{},
				drawer:false,
				
				pageSize: 10,
				pageSizes: [5, 10, 15, 20, 30, 40, 50], // select选项设置：条/页
				currentPage: 1,
				total: 100,
			}
		},
		created() {
			var docId = sessionStorage.getItem('docId')
			if(docId != null){
				//获取预约当前医生的预约信息
			this.$http.get('/apt_api/getRecordByDocId',{params:{docId:docId}}).then(res=>{
				console.log(res)
				var info = res.data.data.aptInfo
				this.aptData = []	//清空数组
				this.aptInfo = info
				info.forEach(el=>{
					if(el.recordStatus == 1){
						this.aptData.push(el)
					}
				})
			}).catch(e=>{
				this.$message({
					message:'服务器错误！',
					type:'error'
				})
			})
			}else{
				this.$message({
					message:'当前角色未获得此权限！',
					type:'error'
				})
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
				this.total = Math.ceil(this.aptInfo.length / val) +1
			      
			  },
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			handleClick(tab, event) {
			  this.aptData = []	//清空数组
			  if(tab.index == 0){
				  this.aptInfo.forEach(el=>{
				  	if(el.recordStatus == 1){
				  		this.aptData.push(el)
				  	}
				  })
			  }else if(tab.index == 1){
				  this.aptInfo.forEach(el=>{
				  	if(el.recordStatus == 2){
				  		this.aptData.push(el)
				  	}
				  })
			  }
			},
			handleClose(){
				this.drawer = false
			},
			outApt(index,row){
				//更改预约状态为失效
				this.$http({
					method:'post',
					url:'/apt_api/changeApt',
					params:{
						appointNo:row.appointNo,
						recordStatus:6
					}
				}).then(res=>{
					if(res.data.code == 0){
						this.$message({
							message:res.data.data.result,
							type:'success'
						})
						location.reload(true)
					}else{
						this.$message({
							message:res.data.data.result,
							type:'warning'
						})
					}
				}).catch(e=>{
					this.$message({
						message:'服务器错误！',
						type:'error'
					})
				})
			},
			finishApt(index,data){
				console.log(index,data)
				// 更改预约状态为已完成
				this.$http({
					method:'post',
					url:'/apt_api/changeApt',
					params:{
						appointNo:data.appointNo,
						recordStatus:'2'
					}
				}).then(res=>{
					if(res.data.code == 0){
						this.$message({
							message:res.data.data.result,
							type:'success'
						})
						location.reload(true)
					}else{
						this.$message({
							message:res.data.data.result,
							type:'error'
						})
					}
				}).catch(e=>{
					this.$message({
						message:'服务器错误！',
						type:'error'
					})
				})
				
			},
			showRow(index,data){
					  this.drawerData = data.row
					  this.drawer = true
					  console.log(index,data)
			},
		}
	}
</script>

<style>
	
</style>
