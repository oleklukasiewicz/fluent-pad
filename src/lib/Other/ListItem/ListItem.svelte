<script lang="ts">
    import type { BaseItem } from "../../../types/data";
    import { DATE_FORMAT } from "../../../helpers";
    
    import MultiSelectListItem from "../MultiSelectListItem/MultiSelectListItem.svelte";

    export let item: BaseItem;
    export let isCompact: boolean = true;
    export let selected: boolean = false;
    export let multiselect: boolean = false;
</script>

<MultiSelectListItem
    on:select
    on:unselect
    {multiselect}
    bind:selected
    {...$$restProps}
    on:click
    class={"container " + (!isCompact ? "extended" : "compact")}
>
    {#if isCompact}
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
