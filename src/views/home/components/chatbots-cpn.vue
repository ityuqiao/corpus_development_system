<template>
  <div class="bgbox">
    <div class="chatbox">
      <transition-group name="log">
        <div class="log" v-for="(item, index) in data" :key="index">
          <img class="avatar" src="../../../assets/img/blur-book.jpg" alt="" />
          <div :class="{
            chatContentUser: item.role === 'user',
            chatContentBots: item.role === 'assistant',
            chatContent: true,
          }">
            {{ item.content }}
          </div>
        </div>
      </transition-group>
    </div>
    <div class="Inputbox">
      <input :class="{ 'chatInput': true, 'error': isEmpty }" @input="inputQuestion" v-model="texts" type="text"
        :placeholder="placeholderText" />
      <el-button class="gptBtn" type="primary" @click="getAnswer">获取回答</el-button>
      <el-button type="success">提交</el-button>
    </div>
    <div class="answerInput" v-if="answerChange">
      <el-input type="textarea" v-model="answer"></el-input>
    </div>
  </div>
</template>

<script>
// import { getAnswer } from "@/server/chatbots";
import { data } from "./data";

export default {
  name: "chatbots-cpn",
  mounted() {
    this.scrollBox = document.querySelector('.chatbox')
  },
  data() {
    return {
      isEmpty: false,
      placeholderText: '您可以随便问我一些问题',
      texts: "",
      data,
      scrollBox: null,
      answerChange: true
    };
  },
  methods: {
    async getAnswer() {
      // try {
      //   const data = await getAnswer(this.texts);
      //   console.log(data);
      // } catch (error) {
      //   console.log(error);
      // }
      if (this.texts.trim() === '') {
        this.placeholderText = '请写一下话吧',
          this.isEmpty = true
        return
      }
      this.data.push({
        "role": "user",
        "content": this.texts
      },)
      this.texts = ''
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom() {
      this.scrollBox.scrollTop = this.scrollBox.scrollHeight;
    },

    inputQuestion() {
      this.placeholderText = '您可以随便问我一些问题',
        this.isEmpty = false
    }
  },
};
</script>

<style scoped>
.log {
  display: flex;
  margin-bottom: 20px;
}

.log .chatContent {
  color: #fff;
  background-color: #10aeff;
  border: 1px solid #10aeff;
  padding: 15px;
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 8px;
  font-size: 20px;
}

.log .chatContentUser {
  color: #fff;
  background-color: #10aeff;
  border: 1px solid #10aeff;
}

.log .chatContentBots {
  color: #000;
  background-color: #fff;
  border: 1px solid #fff;
}

.log .avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
}

.bgbox {
  width: 100%;
  height: 100%;
  padding-left: 15px;
  /* border: 3px solid skyblue; */
  /* border-radius: 15px; */
}

.chatInput {
  width: 800px;
  height: 50px;
  margin-left: 15px;
  padding-left: 30px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 15px;
  font-size: 20px;
}

.chatInput::placeholder {
  opacity: 0.5;
}

.error::placeholder {
  color: red;
}


.chatInput:focus {
  border: 1px solid skyblue;
  outline: 1px solid skyblue;
}

.chatbox {
  padding-top: 15px;
  padding-right: 20px;
  margin: 15px;
  height: 550px;
  background-color: #f1f1f1;
  overflow-y: auto;
  border-radius: 10px;
}

.chatbox::-webkit-scrollbar {
  width: 5px;
}

.chatbox::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.chatbox::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.gptBtn {
  margin-left: 15px;
}

.log-enter-active,
.log-leave-active {
  animation: appear 0.5s ease;
}

.log-enter,
.log-leave-to {
  opacity: 0;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: translateX(20px) translateY(20px);
  }
  }
</style>