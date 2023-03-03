<script lang="ts">
    import {_} from "svelte-i18n";
    import {
        control,
        title,
        content,
        item,
        id,
        groups,
        group as selectedGroup,
        isItemExpanded,
        groupControl,
        isMobileView,
    } from "../../viewModel/ItemViewModel";

    import { SelectionGroup } from "../../types/data";

    import ItemViewOptions from "../../lib/Item/ItemViewOptions/ItemViewOptions.svelte";
    import Placeholder from "../../lib/Item/ItemPlaceholder/ItemPlaceholder.svelte";
    import Bange from "../../lib/Other/Bange/Bange.svelte";

    import EditGroupsIcon from "@fluentui/svg-icons/icons/channel_add_16_regular.svg?raw";

    let groupList = [];

    $: $id ? setGroupList() : "";

    function setGroupList() {
        groupList = groupControl
            .getAll()
            .map(
                (_group) =>
                    new SelectionGroup(
                        _group,
                        groupControl.itemIndexInGroup($item, _group) != -1
                    )
            );
    }

    function expandToggle(event) {
        $isItemExpanded = event.detail.isExpanded;
    }
    function removeItem() {
        control.remove($id);
    }
    function groupClick(group) {
        if ($selectedGroup.id != group.id) groupControl.select(group);
        else groupControl.selectDefault();
    }

    function onRemoveFromGroup(event) {
        if (event.detail.group.id == $selectedGroup.id)
            groupControl.selectDefault();
        groupControl.removeItem(event.detail.group, event.detail.item);
    }
    function onAddToGroup(event) {
        groupControl.addItem(event.detail.group, event.detail.item);
    }
</script>

<div id="item-view">
    {#if $id}
        <ItemViewOptions
            expandable={!$isMobileView}
            groups={groupList}
            expanded={$isItemExpanded}
            item={$item}
            on:removefromgroup={onRemoveFromGroup}
            on:addtogroup={onAddToGroup}
            on:expandtoggle={expandToggle}
            on:remove={removeItem}
        />
        <input id="item-title" placeholder="Enter title" bind:value={$title} />
        <div id="groups">
            {#each $groups as group}
                <Bange
                    variant={$selectedGroup.id == group.id
                        ? "accent"
                        : "standard"}
                    on:click={() => groupClick(group)}
                >
            {group.title}
            </Bange>

            {/each}
            <!--<Bange variant="link">{@html EditGroupsIcon} {$_("operations.set_groups")} </Bange>-->
        </div>
        <textarea
            id="item-content"
            bind:value={$content}
            placeholder="Type content"
        />
    {:else}
        <Placeholder />
    {/if}
</div>

<style lang="scss">
    @use "ItemView.scss";
</style>
