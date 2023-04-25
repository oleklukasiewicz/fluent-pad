<script>
    import TextPlaceholder from "../TextPlaceholder/TextPlaceholder.svelte";
    export let gap = false;
    export let compact = false;
</script>

<div class="item-list-placeholder" class:gap>
    <TextPlaceholder size="16px" />
    {#if !compact}
    <TextPlaceholder size="16px" />
    {/if}
</div>

<style lang="scss">
    .item-list-placeholder {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        margin: 4px;
        &.gap {
            margin: 6px 0;
        }
    }
</style>
