<script lang="ts">
    import type { Group } from "$type/data";
    import { DATE_FORMAT } from "$src/helpers";

    import { ListItem } from "fluent-svelte";
    import { _ } from "svelte-v4-i18n";

    export let group: Group = {} as Group;
    export let selected: boolean = false;
    export let href = "";
    export let compact = false;
</script>

<ListItem
    class={"list-group " + (!compact ? "extended" : "compact")}
    {href}
    {selected}
    on:click
    on:select
>
    {#if compact}
        {group.title}
    {:else}
        <div class="group-data">
            <b class="group-title"
                >{group.title || $_("data_names.new_group")}</b
            >
            <span class="group-date">
                {DATE_FORMAT(group.modifyDate)}
            </span>
            <span class="group-content">
                {#if group.itemsCount === 0}
                    {$_("data_names.no_items")}
                {:else if group.itemsCount === 1}
                    {1 + " " + $_("data_names.item")}
                {:else}
                    {group.itemsCount + " " + $_("data_names.items")}
                {/if}
            </span>
        </div>
    {/if}
</ListItem>

<style lang="scss">
    @use "ListGroup.scss";
</style>
