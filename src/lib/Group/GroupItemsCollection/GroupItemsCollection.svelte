<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Item, SelectionItem } from "../../../types/Data";

    import ListItem from "../../Other/ListItem/ListItem.svelte";

    const dispatch = createEventDispatcher();

    export let items: SelectionItem[] = [];
    export let isCompact: boolean = false;
    export let isMultiselect: boolean = false;

    let onSelect = (sitem: SelectionItem) =>
        dispatch("select", { item: sitem.item });
    let onMultiUnSelect = (sitem: SelectionItem) =>
        isMultiselect ? dispatch("multiunselect", { item: sitem.item }) : "";
    let onMultiSelect = (sitem: SelectionItem) =>
        isMultiselect ? dispatch("multiselect", { item: sitem.item }) : "";
</script>

<div class="group-items-collection">
    {#each items as sitem (sitem.item.id)}
        <ListItem
            item={sitem.item}
            multiselect={isMultiselect}
            {isCompact}
            selected={!sitem.selected ? false : true}
            on:click={() => onSelect(sitem)}
            on:select={() => onMultiSelect(sitem)}
            on:unselect={() => onMultiUnSelect(sitem)}
        />
    {/each}
</div>

<style lang="scss">
    @use "GroupItemsCollection.scss";
</style>
