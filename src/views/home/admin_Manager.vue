<template>
	<div>
	<router-view />
	 <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="margin-left: 15px;height: 200px;">
	    <el-tab-pane label="管理员信息">
			<el-table
			:data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
			style="width: 100%;"
			:header-cell-style="{padding:'0',height:'50px',textAlign:'center'}"
			:cell-style="{textAlign:'center'}"
			max-height="750px"
			highlight-current-row="true"
			>
			<el-table-column
			fixed="left"
			  label="序号"
			  prop="id"
			  >
			</el-table-column>
			
			<el-table-column
			  label="用户名"
			  prop="adminName"
			  >
			</el-table-column>
			<el-table-column
			  label="密  码"
			  prop="adminPwd"
			  >
			</el-table-column>
			<!-- 管理员信息只能查看 -->
			<!-- <el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button disabled = "{scope.row.id == 1 ? true : false}"
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					   &emsp;&emsp;
					  <el-popconfirm
					  	@confirm = "confirmDel(scope.row.id)"
					    confirm-button-text='确定'
					    cancel-button-text='取消'
					    icon="el-icon-info"
					    icon-color="red"
					    title="确定删除吗？"
					  >
			        <el-button slot="reference" disabled = "{scope.row.id == 1 ? true : false}"
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button></el-popconfirm>
			      </template>
			    </el-table-column> -->
				<!-- <el-table-column fixed="right">
					<template slot="header" slot-scope="scope">
					  <el-button type="primary" class="addbtn"
					    round
						plain
					    @click="handleAdd()">add</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<div style="margin-top: 20px">
			    <el-button @click="handleAdd">添加新管理员</el-button>
			</div>
		</el-tab-pane>
		<el-tab-pane label="异常预约管理">
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
				  prop="recordStatus"
				  label="预约状态"
				  width="100">
				</el-table-column>
				<el-table-column
				  prop="refundReason"
				  label="退款理由"
				  width="125"
				  class-name="refund">
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
			      width="295">
			      <template slot-scope="scope">
					  
					  <el-popconfirm
					   icon="el-icon-info"
					    icon-color="red"
					  	title="确认同意退款吗？"
					  	@confirm = "acceptRow(scope.$index, scope.row)"
					  	 @cancel = "cancel">
					  <el-button slot="reference"
					    @click.native.prevent="doAccept(scope.$index, scope.row)"
					    icon="el-icon-money"
						type="warning"
						plain
					    size="small">
					    同意退款
					  </el-button></el-popconfirm>
					  &emsp;			  
						  <el-popconfirm
						   icon="el-icon-info"
							icon-color="red"
							title="确认要拒绝吗？"
							@confirm = "refuseRow(scope.$index, scope.row)"
							 @cancel = "cancel">
						  <el-button slot="reference"
							@click.native.prevent="doAccept(scope.$index, scope.row)"
							icon="el-icon-thumb"
							type="danger"
							plain
							size="small">
							拒绝退款
						  </el-button></el-popconfirm>
						  &emsp;
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
	  </el-tabs>
	  
	  <!-- 对话框 -->
	  <div>
	  	<el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form" :style="{width:'350px'}" >
			  <el-form-item label="用户名"  prop="name" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" :style="{width:'240px'}"></el-input>
			  </el-form-item>
			  <el-form-item label="密    码"  prop="pwd" :label-width="formLabelWidth">
				<el-input v-model="form.pwd" autocomplete="off" :style="{width:'240px'}"></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
	      <el-button @click="dialogFormVisible = false">取 消</el-button>
	      <el-button :disabled="flag" type="primary" @click="confirmAdd('form')">确 定</el-button>
	    </div>
		</el-dialog>
	  </div>
	  <div v-if="flag" class="block" style="float:right">
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
			  <el-descriptions-item span="2" label="退款理由">{{drawerData.refundReason}}</el-descriptions-item>
	  		  <el-descriptions-item span="2" label="创建时间">{{formateTime(new Date(drawerData.createTime))}}</el-descriptions-item>
	  	  	  <el-descriptions-item span="2" label="订单状态"><el-tag size="small">{{drawerData.recordStatus}}</el-tag> <p>Tips:1为已支付且待完成，2为已完成，3为申请退款中，4为已退款</p></el-descriptions-item>
	  	  	</el-descriptions>
	  	  </div>
	  	</el-drawer>
	  </div>
	  
	</div>
	
</template>

<script>
	export default{
		data(){
			 return{
				tabPosition:'top',
				tableData:[],
				aptData:[],
				flag:false,
				form:{
					name:'',
					pwd:''
				},
				
				drawerData:{},
				drawer:false,
				
				pageSize: 10,
				pageSizes: [5, 10, 15, 20, 30, 40, 50], // select选项设置：条/页
				currentPage: 1,
				total: 100,
				
				dialogFormVisible:false,
				flag:false,
				formLabelWidth:'80px',
				rules: {
				  name: [
				    { required: true, message: '请输入用户名', trigger: 'blur' },
				    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  pwd: [
				    { required: true, message: '请输入密码', trigger: 'blur' }
				  ],
			},
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
			handleClose(){
					  this.drawer = false
			},
			showRow(index,data){
					  this.drawerData = data.row
					  this.drawer = true
					  console.log(index,data)
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.total = Math.ceil(this.aptData.length / val) +1
			      
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			doAccepet(index,row){},
			acceptRow(index,row){
					this.$http({
						method:'post',
						url:'/admin_api/doRefund',
						params:{
							appointNo:row.appointNo,
							userId:row.userId
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
							message:"服务器错误！",
							type:'error'
						})
					})
			},
			refuseRow(index,row){
				//TODO：拒绝退款
				this.$http({
					method:'post',
					url:'/apt_api/changeApt',
					params:{
						appointNo:row.appointNo,
						recordStatus: 5
					}
				}).then(res=>{
					// console.log(res.data.data)
					if(res.data.code == 0 ){
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
						message:'服务器错误',
						type:'error'
					})
				})
			},
			handleAdd(){
				this.dialogFormVisible = true
			},
			confirmAdd(form){
				let {name,pwd} = this.form;
				this.$refs[form].validate((valid) => {
					if(valid){
						//todo:提交新管理员信息
						this.$http({
							method:'post',
							url:'/admin_api/add_admin',
							data:{
								adminName:name,
								adminPwd:pwd
							}
						}).then(res=>{
							console.log(res)
							if(res.data.code == 0){
								this.$message({
									message:'添加成功！',
									type:'success'
								})
								location.reload(true)
							}else{
								this.$message({
									message:'添加失败！',
									type:'error'
								})
							}
							
						})
						this.dialogFormVisible = false
					}else{
						this.flag = true
					}
				})
				
			},
			handleClick(tab, event){
				if(tab.index == 1){
					this.flag = true
					this.$http.get('/apt_api/getAptInfoByStatus',{params:{recordStatus:3}}).then(res=>{
						console.log(res)
						if(res.data.data.aptInfo.length != 0 ){
							this.aptData = res.data.data.aptInfo
						}else{
							this.$message({
								message:'暂无异常预约！',
								type:'warning'
							})
						}
						
					}).catch(e=>{
						this.$message({
							message:'服务器错误！',
							type:'error'
						})
					})
				}else{
					this.flag = false
				}
			},
		},
		created() {
			this.$http.get("/admin_api/admin_info").then(res =>{
				this.tableData = res.data.data.admin_info
			})
			
		}
	}
</script>

<style>
	.refund{
		color:#FF4D51
	}
</style>
