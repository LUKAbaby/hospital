<template>
	<div class="table">
		<!-- <h4>医生信息</h4> -->
		<el-table
		    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
		    :header-cell-style="{textAlign:'center'}"
			:cell-style="{textAlign:'center'}"
			max-height="750px"
			highlight-current-row="true"
			>
		    <el-table-column
			fixed="left"
		      label="序号"
		      prop="id"
			  width="50px">
		    </el-table-column>
		    <el-table-column
		      label="医生照片"
			  
		      width="120px">
			  <template slot-scope="scope">
				  <img :src="scope.row.docImgpath" style="width: auto;height: auto;max-width: 50%;max-height: 50%;" />
			  </template>
		    </el-table-column>
			<el-table-column
			  label="照片路径"
			  prop="docImgpath"
			  width="120px">
			</el-table-column>
			<el-table-column
			  label="医生姓名"
			  prop="docName"
			  width="120px">
			</el-table-column>
			<el-table-column
			  label="年龄"
			  prop="docAge"
			  width="100px">
			</el-table-column>
			<el-table-column
			  label="职称"
			  prop="docProfession"
			  width="100px">
			</el-table-column>
			
			<el-table-column
			  label="所属科室"
			  prop="docDep"
			  width="120px">
			</el-table-column>
			<el-table-column
			  label="是否专家"
			  prop="isExpert"
			  width="100px">
			  <template slot-scope="scope">
			  	{{scope.row.isExpert == 1?'是':'否'}}
			  </template>
			</el-table-column>
			<el-table-column
			  label="预约费用"
			  prop="appointFee">
			</el-table-column>
			<el-table-column
			  label="接诊状态"
			  prop="isOpen"
			  width="100px">
			  <template slot-scope="scope">
			  	{{scope.row.isOpen == 1?'休息中':'接诊中'}}
			  </template>
			</el-table-column>
			<el-table-column
			  label="简介"
			  prop="docIntroduce"
			  width="300px">
			</el-table-column>
			<el-table-column width="150px">
				<template slot="header" slot-scope="scope">
				  <el-input
				    v-model="search"
				    size="mini"
					:value=search
				    placeholder="输入关键字搜索"/>
				</template>
			</el-table-column>
		    <el-table-column
		      align="right"
			  fixed="right"
			  width="180px">
			  <template slot="header" slot-scope="scope">
			    <el-button type="primary" class="addbtn"
			      round
			      @click="handleAdd()">add</el-button>
			  </template>
			  
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
				 &emsp;&emsp;
				  <el-popconfirm
					@confirm = "confirmDel(scope.row.id)"
				    confirm-button-text='确定'
				    cancel-button-text='取消'
				    icon="el-icon-info"
				    icon-color="red"
				    title="确定删除吗？"
				  >
		        <el-button
				  slot="reference"
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">Delete</el-button></el-popconfirm>
		      </template>
		    </el-table-column>
		  </el-table>
		<!-- 编辑信息对话框 -->
		<div>
			<el-dialog title="医生信息修改" :visible.sync="dialogFormVisible" >
			  <el-form :model="form" :style="{width:'450px'}"  v-loading="loading">
				  <el-form-item label="ID" style="display: none;">
					  <!-- 隐藏ID项 -->
					  <el-input v-model="form.id" />
				  </el-form-item>
				  <!-- 医生表单 -->
				<div>
				  	<el-form-item label="医生姓名:" :label-width="formLabelWidth">
			      <el-input v-model="form.docName" autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="医生年龄:" :label-width="formLabelWidth">
				  <el-input v-model="form.docAge" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="医生照片:" :label-width="formLabelWidth">
					<template slot-scope="scope">
						<el-upload
						  class="avatar-uploader"
						  action="/file_api/upload_img"
						  :data="{filename:'doc'+form.id+'_img'}"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						点击头像上传
						<el-input v-model="form.docImgpath" autocomplete="off" disabled="true" />
					</template>
					
				</el-input>
				</el-form-item>
				<el-form-item label="所属科室:" :label-width="formLabelWidth">
				  <el-select v-model="form.docDep" placeholder="所属科室">
				   <el-option v-for="item in depData" :key="item.id" :label="item.depName" :value="item.depId"></el-option>
				  </el-select>
				</el-form-item>
			    <el-form-item label="职    称:" :label-width="formLabelWidth">
			      <el-select v-model="form.docProfession" placeholder="医生职称">
			        <el-option label="医师" value="医师"></el-option>
			        <el-option label="主治医师" value="主治医师"></el-option>
							<el-option label="副主任医师" value="副主任医师"></el-option>
							<el-option label="主任医师" value="主任医师"></el-option>
			      </el-select>
			    </el-form-item>
				
				<el-form-item label="专    家:" :label-width="formLabelWidth">
				  <el-select v-model="form.isExpert" placeholder="是否为专家">
				   <el-option label="是 -- 1" value="1"></el-option>
				   <el-option label="否 -- 0" value="0"></el-option>
				  </el-select>
				</el-form-item>
				
				<el-form-item label="工作状态:" :label-width="formLabelWidth">
				  <el-select v-model="form.isOpen" placeholder="工作状态">
				   <el-option label="可预约 -- 0" value="0"></el-option>
				   <el-option label="休息中 -- 1" value="1"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item  label="预约费用:" :label-width="formLabelWidth">
					<el-input-number v-model="form.appointFee" :min="15" :max="200" :step="1"></el-input-number>
				</el-form-item>
				<el-form-item label="简    介:" :label-width="formLabelWidth">
				  <el-input type="textarea" v-model="form.docIntroduce" placeholder="请用一段话描述……"></el-input>
				</el-form-item>
				  </div>
			    
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="toChange">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
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
	// import Dialog from '../../components/Dialog'
	export default{
		inject:['reload'],
		
		data(){
			return{
				search:'',
				tableData:[],
				depData:[],
				dialogFormVisible:false,
				
				pageSize: 10,
				pageSizes: [5, 10, 15, 20, 30, 40, 50], // select选项设置：条/页
				currentPage: 1,
				total: 100,
				
				form: {
					id:'',
				    docName: '',
				    docAge: '',
				    docImgpath: '',
				    docProfession: '',
				    docDep: '',
					appointFee:'',
				    isExpert: '',
				    isOpen: '',
				    docIntroduce: ''
				  },
				  formLabelWidth: '80px',
				  imageUrl:'',
				  loading:false
				//title:''		
			}
		},
		created() {
			this.$http({
				method:'post',
				url:'/doc_api/doctorsInfo',
				data:{
					
				}
			}).then( (res)=>{
				this.tableData = res.data.data.dtInfoList
				console.log(res)
			})
			this.$http.get('/dep_api/depInfo').then((res) => {
				this.depData = res.data.data.DepInfo
				console.log(this.depData)
			})
		},
		methods:{
			handleSizeChange(val) {
				this.pageSize = val;
				this.total = Math.ceil(this.tableData.length / val) +1
			      
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			
			handleEdit(index, row) {
				this.dialogFormVisible = true
				this.form = row
				this.imageUrl = row.docImgpath
				console.log(index, row);
			  },
			handleDelete(index, row) {
				console.log(index, row);
			  },
			confirmDel(e){
				  console.log("确认删除"+e)
				  this.$http({
					  url:'/doc_api/delete_doc',
					  data:{
						  id:e	//根据ID删除
					  }
				  }).then(res=>{
					  if(res.data.data.code == 0){
						  this.$message({
							  message:"删除成功！",
							  type:"success"
						  })
						  location.reload(true)
					  }else{
						  this.$message({
							  message:"删除失败！",
							  type:"error"
						  })
					  }
				  }).catch(e=>{
					  this.$message({
							  message:"服务器错误！",
							  type:"error"
					  })
				  })
			  },
			handleAdd(){
				  this.form = {
					id:'',
				    docName: '',
				    docAge: '',
				    docImgpath: '',
				    docProfession: '',
				    docDep: '',
					appointFee:'',
				    isExpert: '',
				    isOpen: '',
				    docIntroduce: ''
				  }
				  this.dialogFormVisible = true
			  },
			  
			handleAvatarSuccess(res, file) {
				console.log("上传头像",file.raw)
			          this.imageUrl = URL.createObjectURL(file.raw);
					  var i = file.raw.name.lastIndexOf('.')
					  this.form.docImgpath = '/api/file/doc'+this.form.id+'_img'+file.raw.name.substr(i,file.raw.name.length)
			        },
			beforeAvatarUpload(file) {
			  const isJPG = file.type === 'image/jpeg';
			  const isLt2M = file.size / 1024 / 1024 < 2;
	  
			  if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			  }
			  if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			  }
			  return isJPG && isLt2M;
			},
			toChange(){
				console.log('提交修改'+JSON.stringify(this.form))
				this.loading=true
				
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
						this.dialogFormVisible =false
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
				
				
			}
		},
		// components:{
		// 	Dialog
		// }
	}
</script>

<style>
	.addbtn{
		width: 100px;
	}
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
</style>
