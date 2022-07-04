<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
			  <el-form-item label="ID" style="display: none;">
				  <!-- 隐藏ID项 -->
				  <el-input v-model="form.id" />
			  </el-form-item>
			  <!-- 医生表单 -->
			  <div >
			  	<el-form-item label="医生姓名:" :label-width="formLabelWidth">
		      <el-input v-model="form.docname" autocomplete="off"></el-input>
		    </el-form-item>
			<el-form-item label="医生年龄:" :label-width="formLabelWidth">
			  <el-input v-model="form.docage" autocomplete="off"></el-input>
			</el-form-item>
		    <el-form-item label="活动区域" :label-width="formLabelWidth">
		      <el-select v-model="form.region" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
			  </div>
		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			// dialogFormVisible: false,
			        form: {
						id:'',
			          name: '',
			          region: '',
			          date1: '',
			          date2: '',
			          delivery: false,
			          type: [],
			          resource: '',
			          desc: ''
			        },
			        formLabelWidth: '120px',
					//title:''
			      };
			},
		props:{
			title: String,
			dialogFormVisible: Boolean
		}
	
	}

</script>

<style>
</style>
