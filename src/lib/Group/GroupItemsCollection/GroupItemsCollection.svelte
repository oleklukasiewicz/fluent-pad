<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Item } from "../../../types/data";

    import ListItem from "../../Other/ListItem/ListItem.svelte";

    const dispatch = createEventDispatcher();

    export let items: any[] = [];
    export let selectedItem: Item = {} as Item;
    export let isCompact: boolean = false;
    export let isMultiselect: boolean = false;

    let selectedItems = [];
    
    $: selectedItems = items.map((item: any) => (item.selected = false));

    let onSelect = (item: Item) =>
        !isMultiselect
            ? item.id != selectedItem.id
                ? dispatch("select", { item })
                : ""
            : "";
    let onMultiUnSelect = (item: Item) =>
        isMultiselect ? dispatch("multiunselect", { item }) : "";
    let onMultiSelect = (item: Item) =>
        isMultiselect ? dispatch("multiselect", { item }) : "";
</script>

<div class="group-items-collection">
    {#each items as item (item.id)}
        <ListItem
            {item}
            multiselect={isMultiselect}
            {isCompact}
            selected={!isMultiselect
                ? selectedItem.id == item.id
                : item.selected}
            on:click={() => onSelect(item)}
            on:select={() => onMultiSelect(item)}
            on:unselect={() => onMultiUnSelect(item)}
        />
    {/each}
</div>

<style lang="scss">
    @use "GroupItemsCollection.scss";
</style>
