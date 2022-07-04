<template>
	<div>
		<h1>个人信息</h1>
		<!-- 管理员个人信息 -->
		<template v-if="role == 1">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>详细信息</span>
					<el-button style="float: right; padding: 3px 0" type="text" @click="change = !change">
						{{change == true ?'修改':'取消'}}</el-button>
				</div>
				<div style="margin-left: 450px;">
					<el-form v-loading="loading" :model="form" :rules="rules" ref="form" :style="{width:'350px'}">
						<el-form-item label="用户名" prop="adminName" :label-width="formLabelWidth">
							<el-input v-model="form.adminName" :disabled="change" autocomplete="off"
								:style="{width:'240px'}"></el-input>
						</el-form-item>
						<el-form-item label="密    码" prop="adminPwd" :label-width="formLabelWidth">
							<el-input v-model="form.adminPwd" :disabled="change" type="password" autocomplete="off"
								:style="{width:'240px'}"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="">确 定</el-button>
						&emsp;&emsp;
					<el-popconfirm
						 icon="el-icon-info"
						  icon-color="red"
							title="确认要修改吗？"
							@confirm = "updateAdmin('form')"
							 @cancel = "cancel">
						<el-button slot="reference" :disabled="change" type="primary">修改信息</el-button>
						</el-popconfirm>
					</div>
				</div>
			</el-card>
		</template>

		<!-- 医生个人信息 -->
		<template v-if="role == 0">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>详细信息</span>
					<el-button style="float: right; padding: 3px 0" type="text" @click="change = !change">
						{{change == true ?'修改':'取消'}}</el-button>
				</div>
				<div style="margin-left: 450px;">
					<el-form  v-loading="loading" :model="form" :style="{width:'450px'}">
						<el-form-item label="ID" style="display: none;">
							<!-- 隐藏ID项 -->
							<el-input v-model="form.id" />
						</el-form-item>
						<!-- 医生表单 -->
						<div>
							<el-form-item label="医生姓名:" :label-width="formLabelWidth">
								<el-input v-model="form.docName" :disabled="change" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="后台密码:" :label-width="formLabelWidth">
								<el-input v-model="form.docPassword" type="password" :disabled="change" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="医生年龄:" :label-width="formLabelWidth">
								<el-input v-model="form.docAge" :disabled="change" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="医生照片:" :label-width="formLabelWidth">
								<template slot-scope="scope">
									<el-upload class="avatar-uploader" :disabled="change" action="/file_api/upload_img"
										:data="{filename:'doc'+form.id+'_img'}" :show-file-list="false"
										:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="form.docImgpath" :src="form.docImgpath" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									点击头像上传
									<el-input v-model="form.docImgpath" autocomplete="off" disabled="true" />
								</template>

								</el-input>
							</el-form-item>
							<el-form-item label="所属科室:" :label-width="formLabelWidth">
								<el-select :disabled="change" v-model="form.docDep" placeholder="所属科室">
									<el-option v-for="item in depData" :key="item.id" :label="item.depName"
										:value="item.depId"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="职    称:" :label-width="formLabelWidth">
								<el-select :disabled="change" v-model="form.docProfession" placeholder="医生职称">
			 					<el-option label="医师" value="医师"></el-option>
									<el-option label="主治医师" value="主治医师"></el-option>
									<el-option label="副主任医师" value="副主任医师"></el-option>
									<el-option label="主任医师" value="主任医师"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="专    家:" :label-width="formLabelWidth">
								<el-select :disabled="change" v-model="form.isExpert" placeholder="是否为专家">
									<el-option label="是 -- 1" value="1"></el-option>
									<el-option label="否 -- 0" value="0"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="工作状态:" :label-width="formLabelWidth">
								<el-select :disabled="change" v-model="form.isOpen" placeholder="工作状态">
									<el-option label="可预约 -- 0" value="0"></el-option>
			 					<el-option label="休息中 -- 1" value="1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="预约费用:" :label-width="formLabelWidth">
								<el-input-number :disabled="change" v-model="form.appointFee" :min="15" :max="200" :step="1">
								</el-input-number>
							</el-form-item>
							<el-form-item label="简    介:" :label-width="formLabelWidth">
								<el-input :disabled="change" type="textarea" v-model="form.docIntroduce" placeholder="请用一段话描述……">
								</el-input>
							</el-form-item>
						</div>

					</el-form>
					<div slot="footer" class="dialog-footer">
			 		<el-button @click="">确 定</el-button>
					&emsp;&emsp;
					<el-popconfirm
					 icon="el-icon-info"
					  icon-color="red"
						title="确认要修改吗？"
						@confirm = "updateDoc"
						 @cancel = "cancel">
						<el-button slot="reference" :disabled="change" type="primary" >修改信息</el-button>
					</el-popconfirm>
					</div>
				</div>
			</el-card>
		</template>
	</div>


</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				role: -1,
				form: {},
				depData: [],
				change: true,
				formLabelWidth: '80px',
				rules: {
					adminName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'change'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'change'
						}
					],
					adminPwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'change'
					}],
				},
			}
		},
		created() {
			var url = ''
			this.role = sessionStorage.getItem('userRole')
			var id
			if (this.role == 1) {
				id = sessionStorage.getItem("adminId")
				url = '/admin_api/get_adminInfoById'
			} else {
				id = sessionStorage.getItem('docId')
				url = '/doc_api/get_docInfoById'
			}
			console.log(id)
			this.$http({
				method: 'get',
				url: url,
				params: {
					Id: id
				}
			}).then(res => {
				console.log(res.data)
				this.form = res.data.data.Info
			})
			this.$http.get('/dep_api/depInfo').then(res=>{
				if(res.data.code == 0){
					this.depData = res.data.data.DepInfo
				}else{
					this.$message({
						message:'获取科室信息失败！',
						type:'warning'
					})
				}
				
			})
		},
		methods: {
			updateAdmin(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){	//如果表单验证成功
						this.$http({
							headers:{
								'Content-Type':'application/json;'
							},
							method:'post',
							url:'/admin_api/update_admin',
							transformRequest:[function (data){
								return JSON.stringify(data)
							}],
							data:this.form	
						}).then(res=>{
							if(res.data.code == 0){
								this.$message({
									message:res.data.data.result,
									type:'success'
								})
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
					}else{
						this.$message({
							message:"请检查表单数据是否正确！",
							type:'warning'
						})
					}
				})
				
			},
			updateDoc(doc){
				//医生信息修改
				this.loading = true
				this.$http({
					headers:{
						'Content-Type':'application/json;'
					},
					method:'post',
					url:'/doc_api/update_docInfo',
					transformRequest:[function (data){
						return JSON.stringify(data)
					}],
					data:this.form
					
				}).then(res =>{
					console.log(res)
					if(res.data.code == 0){
						this.loading = false
						this.$message({
							message:'修改成功！',
							type:'success'
						})
						location.reload(true)
					}else{
						this.loading = false
						this.$message({
							message:'修改失败！',
							type:'error'
						})
					}
				}).catch(e=>{
					this.loading = false
					this.$message({
						message:'服务器错误！',
						type:'error'
					})
				})
				
			},
			cancel(){
				console.log("取消")
				
			}
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #409EFF;
	}
	.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 80px;
	  height: 80px;
	  line-height: 80px;
	  text-align: center;
	}
	.avatar {
	  width: 80px;
	  height: 80px;
	  display: block;
	}
</style>
