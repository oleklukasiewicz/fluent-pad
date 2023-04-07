<script lang="ts">
    import type { Item } from "$type/data";
    import { DATE_FORMAT } from "../../../helpers";
    
    import MultiSelectListItem from "../MultiSelectListItem/MultiSelectListItem.svelte";

    export let item: Item;
    export let compact: boolean = true;
    export let selected: boolean = false;
    export let multiselect: boolean = false;
</script>

<MultiSelectListItem
    on:select
    on:unselect
    on:check
    on:uncheck
    {multiselect}
    bind:selected
    {...$$restProps}
    on:click
    class={"container " + (!compact ? "extended" : "compact")}
>
    {#if compact}
        {item.title}
    {:else}
        <div class="item-data">
            <b class="item-title">{item.title || "New item"}</b>
            <span class="item-date">{DATE_FORMAT(item.modifyDate)}</span>
            <span class="item-content"> {item.content || "No content"}</span>
        </div>
    {/if}
</MultiSelectListItem>

<style lang="scss">
    @use "ListItem.scss";
</style>
