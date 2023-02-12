<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Item } from "../../../types/Data";
    
    import ListItem from "./ListItem.svelte";

    const dispatch = createEventDispatcher();

    export let items: Item[] = [];
    export let selectedItem: Item = {} as Item;
    export let isCompact: boolean = false;

    let onSelect = (item: Item) =>
        item.id != selectedItem.id ? dispatch("select", { item }) : "";
</script>

<div class="item-list-view">
    {#each items as item (item.id)}
        <ListItem
            {item}
            {isCompact}
            selected={selectedItem.id == item.id}
            on:click={() => onSelect(item)}
        />
    {/each}
</div>

<style>
    .item-list-view {
        overflow-y: auto;
        height: 100%;
        overflow-x: hidden;
    }
</style>
