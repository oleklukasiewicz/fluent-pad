<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Item } from "../../../types/Data";
    
    import ListItem from "../../Other/ListItem/ListItem.svelte";

    const dispatch = createEventDispatcher();

    export let items: Item[] = [];
    export let selectedItem: Item = {} as Item;
    export let isCompact: boolean = false;

    let onSelect = (item: Item) =>
        item.id != selectedItem.id ? dispatch("select", { item }) : "";
</script>

<div class="group-items-collection">
    {#each items as item (item.id)}
        <ListItem
            {item}
            {isCompact}
            selected={selectedItem.id == item.id}
            on:click={() => onSelect(item)}
        />
    {/each}
</div>

<style lang="scss">
   @use "GroupItemsCollection.scss"
</style>
