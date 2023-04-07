<script lang="ts">
    import type { SelectionItem } from "$type/data";

    import ListItem from "$lib/Other/ListItem/ListItem.svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let items: SelectionItem[] = [];
    export let compact: boolean = false;

    export let selection: "multi" | "none" | "single" = "multi";

    let isMultiSelect;
    let onlyClick;

    $: isMultiSelect = selection === "multi";
    $: onlyClick = selection === "none";

    let select = function (sitem: SelectionItem) {
        dispatch("select", { item: sitem.item });
    };
    let multiUnSelect = function (sitem: SelectionItem) {
        if (isMultiSelect) dispatch("multiunselect", { item: sitem.item });
    };
    let multiSelect = function (sitem: SelectionItem) {
        if (isMultiSelect) dispatch("multiselect", { item: sitem.item });
    };
</script>

<div class="group-items-collection">
    {#each items as sitem (sitem.item.id)}
        <ListItem
            item={sitem.item}
            multiselect={isMultiSelect}
            {compact}
            selected={onlyClick ? false : !sitem.selected ? false : true}
            on:click={() => select(sitem)}
            on:select={() => multiSelect(sitem)}
            on:unselect={() => multiUnSelect(sitem)}
        />
    {/each}
</div>

<style lang="scss">
    @use "GroupItemsCollection.scss";
</style>
