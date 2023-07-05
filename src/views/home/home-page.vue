<template>
  <div class="homeView">
    <div class="header">
      <div class="logo">
        <img src="" alt="" />
        <p class="name">语料开发平台</p>
      </div>
      <div class="avatar">头像</div>
    </div>
    <div class="content">
      <div class="nav">
        <router-link :to="item.to" v-for="(item, index) in navBtn" :key="index">
          <el-button
            class="elBtn"
            :class="{ navBtnActive: currentBtnIndex === index }"
            @click="navBtnClick(index)"
            >{{ item.name }}
          </el-button>
        </router-link>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentBtnIndex: 0,
      navBtn: [
        {
          name: "ChatBots",
          to: "/home/chatbots",
        },
        {
          name: "强化学习",
          to: "/home/sortAnswer",
        },
        {
          name: "主要按钮",
          to: "",
        },
        {
          name: "主要按钮",
          to: "",
        },
        {
          name: "主要按钮",
          to: "",
        },
      ],
    };
  },
  methods: {
    navBtnClick(index) {
      this.currentBtnIndex = index;
    },
  },
};
</script>

<style scoped>
.navBtnActive {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.homeView {
  background-color: #e2e8f0;
}

.elBtn {
  width: 240px;
  height: 52px;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 18px;
}

.header {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  height: 100px;
  background-color: #fff;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.header .name {
  font-size: 30px;
  font-weight: 600;
}

.content {
  display: flex;
}

.view {
  flex: 1;
}

.nav {
  padding-top: 20px;
  width: 300px;
  height: calc(100vh - 100px);
  margin: 14px 15px;
  /* border: 1px solid orange; */
  border-radius: 15px;
  background-color: #fff;
}
</style>