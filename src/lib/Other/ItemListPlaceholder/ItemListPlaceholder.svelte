<script>
    import TextPlaceholder from "../TextPlaceholder/TextPlaceholder.svelte";
    export let gap = false;
    export let compact = false;
</script>

<div class="item-list-placeholder" class:gap>
    <TextPlaceholder size="14px" />
    {#if !compact}
    <TextPlaceholder size="14px" />
    {/if}
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
