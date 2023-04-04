<script>
    import TextPlaceholder from "../TextPlaceholder/TextPlaceholder.svelte";
    export let gap = false;
</script>

<div class="item-list-placeholder" class:gap>
    <TextPlaceholder size="14px" />
    <TextPlaceholder size="14px" />
</div>

<style lang="scss">
    .item-list-placeholder {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 12px;
        &.gap {
            margin: 16px 0;
        }
    }
</style>
