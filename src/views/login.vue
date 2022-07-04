<template>
	<div id="app">
		<h1>医助手管理平台</h1>
		<div class="home">
			<h1>login</h1>
			<div style="width: 420px; margin: 20px auto;">
				<el-form class="demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
					<el-form-item label="身  份" prop="role">
						<el-select v-model="ruleForm.role.value" placeholder="请选择" size="small" style="float: left;">
							<el-option v-for="item in ruleForm.role" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="用户名" prop="name">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="密  码" prop="pwd">
						<el-input v-model="ruleForm.pwd" type="password"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 15px;">立即登录
						</el-button>
						<el-button @click="resetForm('ruleForm')" style="margin-left: 15rpx;">重新输入</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
// import global from "../global/global"
export default {
	name: 'login',
	data() {
		return {
			//labelPosition:'top',
			ruleForm: {
				name: '',
				pwd: '',
				role: [{
					label: '医生',
					value: 0
				},
				{
					label: '管理员',
					value: 1
				}],
			},
			rules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				role: [{
					required: true, message: '请选择身份', trigger: 'change'
				}]
			}
		};
	},
	created() {
		console.log("加载Login")

	},
	// beforeRouteLeave() {
	// 	console.log("login：路由离开")
	// },
	methods: {
		login() {
			// console.log(this.ruleForm)
			let { name, pwd, role } = this.ruleForm;
			let url = '';
			let code;
			if (role.value == 1) {
				this.$http({
					method: 'post',
					url: '/admin_api/login',//this.$global.baseURL
					data: {
						adminName: name,
						adminPwd: pwd		//判断身份选择不同的登录接口
					}
				}).then(res => {
					console.log(res);
					// let code = res.status;	//获取请求状态码
					code = res.data.code;
					if (code == 0) { 	//后端验证成功，返回'200'
						this.$message({
							message: '登录成功！',
							type: 'success'
						});
						sessionStorage.setItem('u_name', name)	//将u_name存储到sessionstorage
						sessionStorage.setItem('userRole', 1)
						sessionStorage.setItem('adminId', res.data.data.adminId)
						this.$router.push('/home/index?role=' + role.value)	//登录成功跳转到'/home'
						// this.$global.userRole = role.value
					} else if (code == -1) {
						this.$message({
							message: '用户名或密码错误！',
							type: 'error'
						});
					}
				})
			} else if (role.value == 0) {
				this.$http({
					method: 'post',
					url: '/doc_api/login',//this.$global.baseURL
					data: {
						docName: name,
						docPassword: pwd		//判断身份选择不同的登录接口
					}
				}).then(res => {
					console.log(res);
					this.isLogin = true
					// let code = res.status;	//获取请求状态码
					code = res.data.code;
					if (code == 0) { 	//后端验证成功，返回'200'
						this.$message({
							message: '登录成功！',
							type: 'success'
						});
						sessionStorage.setItem('u_name', name)	//将u_name存储到sessionstorage
						sessionStorage.setItem('userRole', 0)
						sessionStorage.setItem('docId', res.data.data.doc_id)
						this.$router.push('/home/index?role=' + role.value)	//登录成功跳转到'/home'
						// this.$global.userRole = role.value
					} else if (code == -1) {
						this.$message({
							message: '用户名或密码错误！',
							type: 'error'
						});
					}
				})
			} else {
				//this.$message.warning("请选择登录身份！");
				return false
			}

		},
		submitForm(formName) {
			let { name, pwd, role } = this.ruleForm;
			this.$refs[formName].validate((valid) => {
				console.log(valid)
				//console.log(this.login())
				if (valid) { //表单校验及登录验证判断
					console.log("验证成功" + valid)
					// alert('submit!');
					this.login();
					//console.log(role.label)
				} else {
					console.log("else")
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
}
</script>
<style scoped="scoped">
.home {
	background-color: lightsteelblue;
	height: 420px;
	line-height: 100px;
}
</style>