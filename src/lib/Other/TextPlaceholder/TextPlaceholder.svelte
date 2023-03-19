<script lang="ts">
    export let size="auto";
    let className = "";
	export { className as class };
</script>
<div class="text-placeholder {className}" style="height:{size}"></div>
<style lang="scss">
@use "TextPlaceholder.scss"
</style>