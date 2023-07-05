<template>
  <div class="outer">
    <div class="inner">
      <h2 class="title">欢迎使用预料管理平台</h2>
      <div class="inputBox">
        <i class="iconfont icon-yonghu"></i>
        <input
          class="Input"
          type="text"
          v-model="userName"
          placeholder="请输入用户名"
        />
      </div>
      <div class="inputBox">
        <i class="iconfont icon-mima"></i>
        <div @click="changeShow">
          <i class="iconfont icon-yanjing yj" v-show="showPassword"></i>
          <i class="iconfont icon-biyanjing yj" v-show="!showPassword"></i>
        </div>
        <input
          class="Input"
          :type="passwordType"
          v-model="passWord"
          placeholder="请输入密码"
        />
      </div>
      <el-button
        @click="btnClick"
        class="loginBtn"
        type="primary"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
// import ''
export default {
  name: "index-page",
  data() {
    return {
      userName: "",
      passWord: "",
      showPassword: false,
      passwordType: "password",
    };
  },

  methods: {
    changeShow() {
      this.showPassword = !this.showPassword;
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
	btnClick() {
		this.$router.push('/home')
	}
  },
};
</script>

<style scoped>
.outer {
  background: url("../../assets//img/bg_login.jpg") no-repeat center/100%;
  /* block-size: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.inner {
  padding-top: 40px;
  background-color: #fff;
  border-radius: 10px;
}
.inputBox {
  position: relative;
}
.title {
  font-size: 22px;
  font-weight: 500;
}

.Input {
  display: block;
  margin: 25px auto;
  width: 400px;
  height: 50px;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding-left: 50px;
}

.Input:focus {
  border: 1px solid skyblue;
  outline: 1px solid skyblue;
}

i {
  font-size: 25px;
  position: absolute;
  left: 63px;
  top: 7px;
}
.yj {
  top: 7px;
  left: 400px;
}
.loginBtn {
  display: block;
  margin: 0 auto;
  width: 400px;
}

.inner {
  width: 500px;
  height: 400px;
  /* border: 2px solid orangered; */
}

.title {
  text-align: center;
}
</style>