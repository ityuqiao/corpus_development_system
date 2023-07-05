<template>
	<div class="bgbox">
		<div class="chatbox">
			<p class="title">您可以编辑生成的回答</p>
			<div class="chatBG">
				<transition-group name="log">
					<div class="log" v-for="(item, index) in data" :key="index">
						<img
							class="avatar"
							src="../../../assets/img/blur-book.jpg"
							alt=""
						/>
						<div :class="{chatContent : true, userBoxBottom : item.role === 'user'}">
							<div class="markdown" v-html="markdownContent(item.content)"></div>
							<!-- {{ markdownContent(item.content) }} -->
							<img
								@click="changeAnswer(index)"
								src="../../../assets/img/xiugai.png"
								alt=""
								class="changeImg"
								v-if="item.role !== 'user'"
							/>
						</div>
					</div>
				</transition-group>
			</div>
		</div>
		<div class="Inputbox">
			<input
				:class="{ chatInput: true, error: isEmpty }"
				@input="inputQuestion"
				v-model="texts"
				type="text"
				:placeholder="placeholderText"
			/>
			<el-button
				class="gptBtn"
				type="primary"
				@click="getAnswer"
				:loading="isGetAnswerLoading"
				>获取回答</el-button
			>
		</div>
		<div class="editorBox">
			<rich-text-edit :value="editeValue" @input="changeValue"></rich-text-edit>
			<p class="markdownText">支持MarkDown格式</p>
		</div>
		<div class="footer">
			<transition name="changeBtn">
				<el-button
					class="tBtn"
					v-if="isEdite"
					type="success"
					@click="changeComplete"
					round
					>修改完成</el-button
				>
			</transition>
			<el-button
				type="success"
				class="submit"
				@click="submit"
				:loading="isSubmitLoading"
				>提交审核</el-button
			>
		</div>
	</div>
</template>

<script>
	import markdownit from "markdown-it";
	import "@wangeditor/editor/dist/css/style.css";
	import richTextEdit from "@/components/richTextEdit.vue";
	import { getAnswer, submit } from "@/server/chatbots";
	export default {
		name: "chatbots-cpn",
		mounted() {
			this.scrollBox = document.querySelector(".chatbox");
		},
		components: {
			richTextEdit,
		},
		computed: {
			markdownContent() {
				const md = new markdownit({
					html: true,
					linkify: true,
					typographer: true,
				});
				return (content) => {
					return md.render(content);
				};
			},
		},
		data() {
			return {
				editeValue: "",
				isGetAnswerLoading: false,
				isSubmitLoading: false,
				isFirstAnswer: false,
				isEmpty: false,
				isEdite: false,
				placeholderText: "您可以随便问我一些问题",
				texts: "",
				data: [],
				scrollBox: null,
				answer: "",
				copyAnswer: "",
				currentChangeIndex: 0,
			};
		},

		methods: {
			changeValue(value) {
				this.editeValue = value;
			},
			async submit() {
				if (this.data.length === 0) {
					this.$message("无任何数据需要提交");
					return;
				}
				this.isSubmitLoading = true;
				try {
					const { data } = await submit(this.data);
					if (data.code === 200) {
						this.$message({
							message: "提交成功！",
							type: "success",
						});
						this.data = [];
					}
				} catch (error) {
					console.log(error);
					this.$message.error("提交失败！");
				}
				this.isSubmitLoading = false;
			},
			changeComplete() {
				if (!this.isFirstAnswer) {
					this.data[this.currentChangeIndex].content = this.editeValue;
				} else {
					this.data.push({
						role: "assistant",
						content: this.editeValue,
					});
				}
				this.isEdite = false;
				this.isFirstAnswer = false;
				this.editeValue = "";
				this.$nextTick(() => {
					this.scrollToBottom();
				});
			},
			changeAnswer(index) {
				this.isEdite = true;
				this.editeValue = this.data[index].content;
				this.currentChangeIndex = index;
			},

			async getAnswer() {
				if (this.texts.trim() === "") {
					this.$message({
						message: "请输入问题",
						type: "warning",
					});
					return;
				} else if (this.data.length >= 16) {
					this.$message({
						message: "对话已超过8轮，提交审核后再提问吧",
						type: "warning",
					});
					return;
				}
				this.isGetAnswerLoading = true;
				try {
					const { data } = await getAnswer(this.texts);
					const length = data.response.length;
					console.log(data);
					this.data.push({
						role: "user",
						content: this.texts,
					});
					this.editeValue = data.response[length - 1].content;
					console.log(this.editeValue);
				} catch (error) {
					console.log(error);
					this.$message.error("获取回答失败！");
					this.isGetAnswerLoading = false;
					return;
				}
				this.$nextTick(() => {
					this.scrollToBottom();
				});
				this.isGetAnswerLoading = false;
				this.isFirstAnswer = true;
				this.isEdite = true;
				this.copyAnswer = this.answer;
				this.texts = "";
			},
			scrollToBottom() {
				this.scrollBox.scrollTop = this.scrollBox.scrollHeight;
			},

			inputQuestion() {
				(this.placeholderText = "您可以随便问我一些问题"), (this.isEmpty = false);
			},
		},
	};
</script>

<style scoped>
.userBoxBottom {
	padding-bottom: 20px !important;
}
.markdownText {
	position: absolute;
	font-weight: 500;
	color: #ccc;
	font-size: 18px;
	right: 19px;
	bottom: 6px;
	border: 1px solid #ccc;
	padding: 3px 8px;
	border-radius: 3px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.submit {
	position: absolute;
	height: 50px;
	/* margin-right: 40px; */
	font-weight: 700;
	right: 40px;
	top: 35px;
	font-size: 20px;
}
.footer {
	position: relative;
	background-color: #fff;
	height: 120px;
	border-radius: 15px;
	margin-top: 30px;
	margin-left: 8px;
	margin-bottom: 15px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	margin-right: 20px;
}
.editorBox {
	position: relative;
	background-color: #fff;
	/* width: 1215px; */
	min-height: 330px;
	border-radius: 20px;
	margin-top: 30px;
	padding-top: 20px;
	margin-right: 15px;
	margin-left: 10px;
	padding-bottom: 50px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.chatbox .title {
	font-size: 22px;
	font-weight: 700;
	margin-left: 30px;
	margin-top: 25px;
}

.chatBG {
	background-color: #f7fafc;
	margin-left: 20px;
	border-radius: 15px;
	margin-top: 25px;
	padding: 25px 20px;
	min-height: 405px;
}
.changeImg {
	width: 20px;
	height: 20px;
	cursor: pointer;
	position: absolute;
	right: 12px;
	bottom: 8px;
}

.tBtn {
	background-color: #3182ce;
	border: #3182ce;
	height: 50px;
	border-radius: 8px;
	margin-left: 40px;
	margin-top: 35px;
}

/* .textarea .el-textarea__inner {
  height: 100px !important;
} */

.log {
	display: flex;
	margin-bottom: 20px;
}

.log .chatContent {
	position: relative;
	color: #000;
	background-color: #dfe8f1;
	border: 1px solid #dfe8f1;
	padding: 20px;
	margin-left: 14px;
	padding-bottom: 30px;
	border-radius: 15px;
	font-size: 22px;
	max-width: 900px;
}

.Inputbox {
	margin-top: 35px;
	display: flex;
}

.log .avatar {
	width: 35px;
	height: 35px;
	border-radius: 50%;
	margin-left: 10px;
	margin-top: 5px;
}

.bgbox {
	width: 100%;
	height: 100%;
	padding-left: 15px;
}

.chatInput {
	/* width: 1065px; */
	flex: 1;
	height: 60px;
	margin-left: 15px;
	padding-left: 30px;
	border: 1px solid #ccc;
	outline: none;
	border-radius: 20px;
	font-size: 20px;
}

.chatInput::placeholder {
	opacity: 0.5;
}

.error::placeholder {
	color: red;
}

.chatInput:focus {
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.chatbox {
	/* width: 1210px; */
	padding-top: 15px;
	padding-right: 20px;
	padding-bottom: 25px;
	margin: 15px;
	min-height: 550px;
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
	margin-top: 3px;
	margin-right: 15px;
	margin-left: 10px;
	height: 55px;
	width: 135px;
	border-radius: 8px;
	font-size: 18px;
	background-color: #3182ce;
}

.log-enter-active,
.log-leave-active {
	animation: appear 0.5s ease;
}

@keyframes appear {
	0% {
		opacity: 0;
		transform: translateX(20px) translateY(20px);
	}
}
.changeBtn-enter-active {
	animation: changeBtnEnterAppear 0.5s ease;
}
.changeBtn-leave-active {
	animation: changeBtnLeaveAppear 0.5s ease;
}

@keyframes changeBtnEnterAppear {
	0% {
		opacity: 0;
		transform: translateX(20px);
	}
}

@keyframes changeBtnLeaveAppear {
	100% {
		opacity: 0;
		transform: translateX(20px);
	}
}
</style>