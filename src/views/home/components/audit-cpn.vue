<template>
	<div class="bgbox">
		<div class="chatbox">
			<div class="header">
				<div class="seletBox">
					<el-select v-model="value" placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</div>
				<div class="type">
					<transition name="title">
						<div v-if="value !== ''" class="typeInner">
							<img src="../../../assets/img/leixin.png" class="leixin" alt="" />
							<p>{{ value }}</p>
						</div>
					</transition>
				</div>
			</div>
			<div class="chatBG">
				<transition-group name="log">
					<div class="log" v-for="(item, index) in data" :key="index">
						<img class="avatar" src="../../../assets/img/blur-book.jpg" />
						<div
							:class="{
								chatContent: true,
								userBoxBottom: item.role === 'user',
							}"
						>
							<div
								class="markdown"
								v-html="markdownContent(item.content)"
							></div>
						</div>
					</div>
				</transition-group>
				<div class="simple-page">
					<div>
						<div v-for="(item, index) in list" :key="index">
							<p class="order">{{ index + 1 }}.</p>
							<div class="draggable-item">
								<!-- {{ markdownContent(item.content) }} -->
								<div
									class="markdown"
									v-html="markdownContent(item.content)"
								></div>
								<img
									src="../../../assets/img/shanchu.png"
									class="deleteImg"
									@click="deleteAnswer(index)"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btns">
			<el-button type="primary" class="btn" @click="submit">审核通过</el-button>
			<el-button type="warning" class="btn noPass" @click="submit"
				>审核不通过</el-button
			>
			<el-popconfirm
				@confirm="Delete"
				confirm-button-text="是的"
				cancel-button-text="不"
				icon="el-icon-info"
				icon-color="red"
				title="确定删除该条语料吗？"
			>
				<el-button slot="reference" type="danger" class="btn"
					>删除语料</el-button
				>
			</el-popconfirm>
		</div>
	</div>
</template>

<script>
	import markdownIt from "markdown-it";
	import { data } from "./data";

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
				options: [
					{
						value: "F9语料",
						label: "F9语料",
					},
					{
						value: "强化学习",
						label: "强化学习",
					},
					{
						value: "多轮对话",
						label: "多轮对话",
					},
				],
				value: "",
			};
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
			Delete() {
				console.log(111);
			},
			scrollToBottom() {
				this.scrollBox.scrollTop = this.scrollBox.scrollHeight;
			},
		},
	};
</script>

<style scoped>
.leixin {
	widows: 30px;
	height: 30px;
}
.noPass {
	margin-left: 0;
}
.seletBox {
	/* background-color: #ccc; */
	margin-left: 25px;
	padding-top: 20px;
}
.chatbox .header {
	display: flex;
	justify-content: space-between;
}
.type {
	width: 130px;
	height: 50px;
	font-size: 20px;
	margin-top: 25px;
	margin-right: 25px;
}
.typeInner {
	display: flex;
	justify-content: space-between;
}
.userBoxBottom {
	padding-bottom: 20px !important;
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
	margin: 50px 15px 15px 15px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.btn {
	width: 150px;
	height: 50px;
	margin-right: 30px;
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
	padding-bottom: 30px;
	border-radius: 15px;
	font-size: 20px;
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
	background-color: #fff;
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

.title-enter-active {
	transition: opacity 0.5s ease;
}

.title-enter {
	opacity: 0;
}
</style>