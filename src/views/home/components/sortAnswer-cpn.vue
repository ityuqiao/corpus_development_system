<template>
	<div class="bgbox">
		<div class="chatbox">
			<p class="title">您获取回答然后排序</p>
			<div class="chatBG">
				<transition-group name="log">
					<div class="log" v-for="(item, index) in data" :key="index">
						<img class="avatar" src="../../../assets/img/blur-book.jpg" />
						<div class="chatContent">
							<div v-html="markdownContent(item.content)"></div>
							<!-- {{ item.content }} -->
						</div>
					</div>
				</transition-group>
				<div class="simple-page">
					<Container @drop="onDrop">
						<Draggable v-for="(item, index) in list" :key="index">
							<p class="order">{{ index + 1 }}.</p>
							<div class="draggable-item">
								{{ markdownContent(item.content) }}
								<img
									src="../../../assets/img/shanchu.png"
									class="deleteImg"
									@click="deleteAnswer(index)"
								/>
							</div>
						</Draggable>
					</Container>
				</div>
			</div>
		</div>
		<div class="btns">
			<el-button
				class="getBtn"
				type="primary"
				@click="getMultiQueryAnswer"
				:loading="isGetAnswerLoading"
				>获取回答</el-button
			>
			<!-- <el-button type="primary">主要按钮</el-button> -->
			<el-button type="primary" class="btnSubmit" @click="submit"
				>提交</el-button
			>
		</div>
	</div>
</template>

<script>
	import markdownIt from "markdown-it";
	import { getMultiQueryAnswer } from "@/server/reinforcementLearning";
	import { data } from "./data";
	import { Draggable, Container } from "vue-smooth-dnd";

	const applyDrag = (arr, dragResult) => {
		const { removedIndex, addedIndex, payload } = dragResult;
		if (removedIndex === null && addedIndex === null) return arr;

		const result = [...arr];
		let itemToAdd = payload;

		if (removedIndex !== null) {
			itemToAdd = result.splice(removedIndex, 1)[0];
		}

		if (addedIndex !== null) {
			result.splice(addedIndex, 0, itemToAdd);
		}

		return result;
	};
	export default {
		name: "sort-answer",
		mounted() {
			this.scrollBox = document.querySelector(".chatbox");
		},
		data() {
			return {
				data,
				list: [],
				isGetAnswerLoading: false,
			};
		},
		components: {
			Draggable,
			Container,
		},
		computed: {
			markdownContent() {
				const md = new markdownIt({
					html: true,
					linkify: true,
					typographer: true,
				});
				return (content) => {
					return md.render(content);
				};
			},
		},
		methods: {
			async submit() {
				if (this.list.length <= 0) {
					this.$message({
						message: "回答为空！",
						type: "warning",
					});
				}
			},
			deleteAnswer(index) {
				this.list.splice(index, 1);
			},
			scrollToBottom() {
				this.scrollBox.scrollTop = this.scrollBox.scrollHeight;
			},
			onDrop(dropResult) {
				this.list = applyDrag(this.list, dropResult);
			},
			async getMultiQueryAnswer() {
				if (this.list.length >= 5) {
					this.$message({
						message: "回答不能超过五条",
						type: "warning",
					});
					return;
				}
				this.isGetAnswerLoading = true;
				try {
					const { data } = await getMultiQueryAnswer(this.data, this.list);
					this.list = data.response.sorted_answer_list;
				} catch (error) {
					console.log(error);
					this.$message.error("获取回答失败！");
				}
				this.$nextTick(() => {
					this.scrollToBottom();
				});
				this.isGetAnswerLoading = false;
			},
		},
	};
</script>

<style scoped>
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
.order {
	margin-left: 24px;
	font-size: 20px;
}
.deleteImg {
	position: absolute;
	widows: 20px;
	height: 20px;
	right: 0;
	bottom: 0;
	cursor: pointer;
}
.btns {
	background-color: #fff;
	height: 120px;
	border-radius: 15px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 50px;
	margin-left: 15px;
	margin-bottom: 15px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.getBtn {
	background-color: #fff;
	color: #000;
	font-weight: 700;
	font-size: 20px;
	height: 50px;
	margin-left: 15px;
	border: 1px solid #ccc;
}
.btnSubmit {
	height: 50px;
	margin-right: 50px;
	font-weight: 700;
	font-size: 20px;
}
.draggable-item {
	position: relative;
	padding: 20px;
	min-height: 50px;
	display: block;
	background-color: #fff;
	outline: 0;
	border: 1px solid rgba(0, 0, 0, 0.125);
	margin-bottom: 3px;
	margin-top: 2px;
	margin-left: 20px;
	border-radius: 10px;
}

.simple-page:hover {
	cursor: grab;
}

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
	padding-bottom: 40px;
	border-radius: 15px;
	font-size: 22px;
	max-width: 900px;
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

.chatbox {
	padding-top: 15px;
	padding-right: 20px;
	margin: 15px;
	min-height: 600px;
	background-color: #f1f1f1;
	overflow-x: hidden;
	border-radius: 20px;
	padding-bottom: 20px;
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
</style>