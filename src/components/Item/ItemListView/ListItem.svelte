<script lang="ts">
    import { ListItem } from "fluent-svelte";

    import type { BaseItem } from "../../../data/Data";
    import { DATE_FORMAT } from "../../../helpers";

    export let item: BaseItem;
    export let isCompact: boolean = true;
    export let selected: boolean = false;
</script>

<ListItem
    on:select
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
            <span class="item-date">{DATE_FORMAT(item.createDate)}</span>
            <span class="item-content"> {item.content || "No content"}</span>
        </div>
    {/if}
</ListItem>

<style>
    :global(.list-item.extended) {
        height: auto !important;
        max-width: 100%;
        margin: 6px auto;
        padding-right: 0px;
    }
    :global(.list-item.extended > *) {
        height: auto;
        margin: 10px !important;
        box-sizing: border-box;
    }
    :global(.list-item > *) {
        width: calc(100% - 20px);
    }
    .item-data {
        display: grid;
        grid-template-rows: auto 1fr;
    }
    .item-content,
    .item-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        margin-right: 10px;
    }
    .item-title {
        display: inline-block;
        grid-row: 1;
    }
    .item-content {
        color: var(--fds-text-secondary);
        min-width: 100%;
        grid-row: 2;
    }
    .item-date {
        display: inline-table;
        color: var(--fds-text-tertiary);
        vertical-align: top;
        text-align: right;
        grid-row: 1;
    }
</style>
