<template>
	<div id="main">
	<!-- <router-view /> -->
	<el-collapse accordion >
	  <el-collapse-item v-for="item in depData" :key="id">
	    <template slot="title">
	     <i class="header-icon el-icon-s-help"></i>{{item.depName}}
	    </template>
	     <el-descriptions title="信息详情" direction="vertical" :column="4" border>
			<template slot="extra">
				<el-button type="primary" size="small" @click="operation(item.id)">操作</el-button>
			</template>
	       <el-descriptions-item label="科室名称">{{item.depName}}</el-descriptions-item>
	       <el-descriptions-item label="科室主任ID">{{item.depAdmin}}</el-descriptions-item>
	       <el-descriptions-item label="科室图标" :span="2">
			<img :src="item.depImgpath" width="50px" style="overflow: hidden;border-radius: 25px;">
			<p>路径：{{item.depImgpath}}</p>
			</el-descriptions-item>
	       <el-descriptions-item label="备注">
	         <el-tag size="small">{{item.depName}}</el-tag>
	       </el-descriptions-item>
	       <el-descriptions-item label="联系电话">{{item.depPhone}}</el-descriptions-item>
	     </el-descriptions>
	  </el-collapse-item>
	</el-collapse>
	
	<div class="btn">
	<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDep">添加科室</el-button>
	</div>
	
	<!-- Drawer -->
	<el-drawer
	  title="科室信息"
	  :before-close="handleClose"
	  :visible.sync="dialog"
	  direction="rtl"
	  custom-class="demo-drawer"
	  ref="drawer"
	  >
	  <div class="demo-drawer__content">
	    <el-form :model="form" :rules="rules" ref="form" :style="{width:'450px'}">
			<el-input v-model="form.Id" autocomplete="off" style="display: none;"></el-input>
	      <el-form-item label="科室名称" prop="depName" :label-width="formLabelWidth">
	        <el-input v-model="form.depName"  autocomplete="off"></el-input>
	      </el-form-item>
		  <el-form-item label="科室图标" prop="depImgpath" :label-width="formLabelWidth">
			  
			  <template slot-scope="scope">
			  	<el-upload
			  	  class="avatar-uploader"
			  	  action="/file_api/upload_img"
			  	  :data="files"
			  	  :show-file-list="false"
			  	  :on-success="handleAvatarSuccess"
			  	  :before-upload="beforeAvatarUpload">
			  	  <img v-if="form.depImgpath" :src="form.depImgpath" class="avatar">
			  	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  	</el-upload>
			  	点击更改图标
			  	<el-input v-model="form.depImgpath"  autocomplete="off" disabled="true" />
			  </template>

		  </el-form-item>
		  <el-form-item label="主任ID" :label-width="formLabelWidth">
		    <el-input v-model="form.depAdmin" name="depAdmin" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="联系电话" :label-width="formLabelWidth">
		    <el-input v-model="form.depPhone" name="depPhone" autocomplete="off"></el-input>
		  </el-form-item>
	    </el-form>
	    <div class="demo-drawer__footer">
	      <el-button @click="cancelForm">取 消</el-button>
		  &emsp;&emsp;
		  <el-popconfirm
		  	@confirm = "delDep()"
		    confirm-button-text='确定'
		    cancel-button-text='取消'
		    icon="el-icon-info"
		    icon-color="red"
		    title="确定删除吗？"
		  >
		  <el-button v-if="del" slot="reference">删除</el-button></el-popconfirm>&emsp;&emsp;
	      <el-button type="primary" @click="submitForm" :loading="loading">{{ loading ? '提交中 ...' : del?'提交':'确认添加' }}</el-button>
	    </div>
	  </div>
	</el-drawer>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				depData:[],
				del:true,
				dialog: false,
				loading: false,
				files:{},
				form:{
					// Id:'',
					// depName:'',
					// depImgpath:'',
					// depPhone:'',
					// depAdmin:'',
								
				},
				formLabelWidth: '80px',
				timer: null,
				rules:{
					depName:[{
						required:true,message:'科室名称不能为空',trigger: 'blur'
					}],
					depImgpath:[{
						
					}]
				}
			}
		},
		created() {
			this.$http.get('/dep_api/depInfo').then(res =>{
				this.depData = res.data.data.DepInfo
				console.log(this.depData)
			})
		},
		methods:{
			operation(id){
				// console.log(id)
				this.form = this.depData[id-1]
				var path = this.depData[id-1].depImgpath
				this.files.filename = path.substring(path.lastIndexOf('/')+1,path.lastIndexOf('.'))
				console.log(this.files)
				this.dialog = true
				this.del = true
			},
			handleAvatarSuccess(res, file) {
				console.log("上传科室图标",file.raw)
			    //this.imageUrl = URL.createObjectURL(file.raw);
				 this.files.filename = this.files.filename +file.name.substring(file.name.lastIndexOf('.'),file.name.length)	//拼接后缀
				 if(!this.del){
					 this.form.depImgpath = '/api/file/'+file.name
					 //alert(this.form.depImgpath)
				 }else{
					 var imgPath = this.form.depImgpath
					 this.form.depImgpath =  imgPath.substring(0,imgPath.lastIndexOf('/')+1)+this.files.filename
				 }
				 
				 console.log(this.form.depImgpath)
			},
			beforeAvatarUpload(file) {
			  const isJPG = file.type === 'image/jpeg';
			  const isLt2M = file.size / 1024 / 1024 < 2;
			 
			  //console.log(this.files)
				  
			  if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			  }
			  if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			  }
			  return isJPG && isLt2M;
			},
			handleClose(done) {
			      if (this.loading) {
			        return;
			      }
				 this.$confirm('确定要关闭吗？')
				        .then(_ => {
				          this.timer = setTimeout(() => {
				            done();
				            // 动画关闭需要一定的时间
				            setTimeout(() => {
				              this.loading = false;
				            }, 400);
				          }, 600);
				        })
				        .catch(_ => {});
			    },
			//添加科室
			addDep(){
				this.form = {
					depName:'',
					depImgpath:'',
					depPhone:'',
					depAdmin:'',
				}
				this.dialog = true
				this.del = false
			},
			//删除科室
			delDep(){
				
				//alert("删除！")
				this.$http.get("/dep_api/delDep",{params:{id:this.form.id}}).then(res=>{
					if(res.data.code == 0){
						this.$message({
							message:res.data.data.result,
							type:"success"
						})
					}else{
						this.$message({
							message:res.data.data.result,
							type:"warning"
						})
					}
					
				}).catch(e=>{
					this.$message({
						message:"服务器错误！",
						type:"error"
					})
				})
			},
			submitForm(){
				let url = '/dep_api/update_dpInfo'
				if(!this.del){
					url = '/dep_api/addDep'
				}
				if(this.form != ''){
					this.$confirm('确定要提交表单吗？')
						.then(_ => {
						  this.loading = true;
						  this.timer = setTimeout(() => {
							
							this.$http({
								headers:{
									'Content-Type':'application/json;'
								},
								method:'post',
								url:url,
								transformRequest:[function (data){
									return JSON.stringify(data)
								}],
								data:this.form,
							}).then(res=>{
								if(res.data.code == 0){
									
									this.$message({
										message:res.data.data.result,
										type:'success'
									})
									this.loading = false;
								}else{
									this.$message({
										message:res.data.data.result,
										type:'error'
									})
									this.loading = false;
								}
							}).catch(e=>{
								this.$message({
									message:'服务器错误！',
									type:'error'
								})
								this.loading = false;
							}) 
							this.dialog = false;
							
						},1500)
						
					}).catch(_ => {});
					
				}else{
					this.$message({
						massage:'数据不能为空！',
						type:'error'
					})
				}
				
				
			},
			cancelForm() {
			  this.loading = false;
			  this.dialog = false;
			  clearTimeout(this.timer);
			},
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
	.btn{
		margin-top: 20px;
	}
</style>
