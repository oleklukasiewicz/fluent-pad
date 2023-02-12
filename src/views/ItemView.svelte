<script lang="ts">
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
    } from "../viewModel/ItemViewModel";

    import ListViewOptions from "../lib/Item/ItemView/ItemViewOptions.svelte";
    import Placeholder from "../lib/Item/ItemView/Placeholder.svelte";
    import Bange from "../lib/Other/Bange.svelte";

    let groupList = [];
    let isGroupsDialogOpen = false;

    function setGroupList() {
        groupList = groupControl.getAll().map((_group) => ({
            isItemInGroup:
                groupControl.itemIndexInGroup($item, _group.id) != -1,
            group: _group
        }));
    }

    function expandToggle(event) {
        $isItemExpanded = event.detail.isExpanded;
    }
    function removeItem() {
        control.remove($id);
    }
    function groupClick(groupId) {
        if ($selectedGroup.id != groupId) groupControl.select(groupId);
        else groupControl.selectDefault();
    }

    function onRemoveFromGroup(event) {
        if (
            $id == event.detail.item.id &&
            $selectedGroup.id == event.detail.group.id
        )
            isGroupsDialogOpen = false;
        groupControl.removeItem(event.detail.group, event.detail.item);
    }
    function onAddToGroup(event) {
        groupControl.addItem(event.detail.group, event.detail.item);
    }

    $: isGroupsDialogOpen && $groups ? setGroupList() : "";
</script>

<div id="item-view">
    {#if $id}
        <ListViewOptions
            groups={groupList}
            isExpanded={$isItemExpanded}
            item={$item}
            bind:isGroupsDialogOpen
            on:removefromgroup={onRemoveFromGroup}
            on:addtogroup={onAddToGroup}
            on:expandtoggle={expandToggle}
            on:remove={removeItem}
        />
        <input id="item-title" placeholder="Enter title" bind:value={$title} />
        <div id="groups">
            {#each $groups as group}
                <Bange
                    label={group.title}
                    variant={$selectedGroup.id == group.id
                        ? "accent"
                        : "standard"}
                    on:click={() => groupClick(group.id)}
                />
            {/each}
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

<style>
    #item-view {
        padding: 8px 8px 8px 16px;
        box-sizing: border-box;
        background-color: var(--fds-solid-background-tertiary);
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    textarea,
    input {
        resize: none;
        width: 100%;
        background-color: transparent;
        color: var(--fds-text-primary);
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
    }
    #item-title {
        font-size: var(--fds-title-large-font-size);
        height: 60px;
    }
    #item-content {
        flex: 1;
    }
    #groups {
        display: flex;
        flex-direction: row;
        gap: 4px;
        margin: 8px 0px 16px;
    }
</style>
