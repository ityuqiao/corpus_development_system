<template>
	<div class="mavonEditor">
		<mavon-editor
			class="editor"
			:toolbars="markdownOption"
			v-model="handbook"
			fontSize="20px"
            :subfield="false"
		/>
	</div>
</template>
  <script>
	export default {
		props: {
			value: {
				type: String,
				default: "",
			},
		},
		watch: {
			value: {
				handler(newVal) {
					this.handbook = newVal;
				},
				immediate: true,
				deep: true,
			},
			handbook: {
				handler(newVal) {
					this.$emit("input", newVal);
				},
				deep: true
			}
		},
		data() {
			return {
				markdownOption: {
					bold: true,
                    htmlcode: true,
					imagelink: true,
					preview: true,
					undo: true, // 上一步
					redo: true,
					link: true,
					mark: true,
					underline: true,
					italic: true,
					fullscreen: true,
					trash: true,
					navigation: true,
                    readmodel: true,
                    code: true, // 粗体
				},
				handbook: "",
			};
		}
	};
</script>
  
  <style scoped>
.mavonEditor {
	margin: 0 20px;
}
.editor {
	min-height: 260px;
}
</style>