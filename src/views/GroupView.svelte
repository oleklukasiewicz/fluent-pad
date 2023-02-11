<script lang="ts">
    import { isListHidden } from "../viewModel/GroupViewModel";

    import ItemListView from "./ItemListView.svelte";
    import ItemView from "./ItemView.svelte";
</script>

<div id="view">
    {#if !$isListHidden}
        <ItemListView />
    {/if}
    <ItemView />
</div>

<style>
    #view {
        display: flex;
        flex-direction: row;
        flex: 1;
    }
    :global(#item-list-grid) {
        flex: 1;
        max-width: 400px;
        min-width: 200px;
    }
    :global(#item-view) {
        flex: 2;
    }
</style>
