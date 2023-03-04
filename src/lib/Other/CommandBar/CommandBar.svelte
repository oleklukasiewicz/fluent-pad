<script lang="ts">
</script>

<div class="command-bar">
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
