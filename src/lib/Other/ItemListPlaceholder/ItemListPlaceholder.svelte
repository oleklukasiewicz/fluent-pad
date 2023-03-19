<script>
    import TextPlaceholder from "../TextPlaceholder/TextPlaceholder.svelte";

</script>
<div class="item-list-placeholder">
    <TextPlaceholder size="14px" />
    <TextPlaceholder size="14px" />
</div>
<style lang="scss">
    .item-list-placeholder {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 12px;
    }
</style>