<script lang="ts">
    let className = "";
    export { className as class };
</script>

<div class={"command-bar " + className}>
    <div class="right-options">
        <slot name="right-options" />
    </div>
    <div class="left-options">
        <slot />
    </div>
</div>

<style lang="scss">
    @use "CommandBar.scss";
</style>
