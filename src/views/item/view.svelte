<script lang="ts">
  import { _ } from "svelte-i18n";
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
    relationsControl,
    needSave
  } from "./model";

  import { SelectionGroup } from "$type/data";

  import ItemViewOptions from "$lib/Item/ItemViewOptions/ItemViewOptions.svelte";
  import Placeholder from "$lib/Item/ItemPlaceholder/ItemPlaceholder.svelte";
  import Bange from "$lib/Other/Bange/Bange.svelte";

  import EditItemGroupsDialog from "$lib/Dialogs/EditItemGroupsDialog/EditItemGroupsDialog.svelte";
  import RemoveItemDialog from "$lib/Dialogs/RemoveItemDialog/RemoveItemDialog.svelte";

  import EditGroupsIcon from "@fluentui/svg-icons/icons/channel_add_16_regular.svg?raw";

  let groupList = [];

  let isRemoveDialogOpen = false;
  let isGroupsDialogOpen = false;

  $: $item.id ? setGroupList() : "";

  function setGroupList() {
    groupList = groupControl
      .getAll()
      .map(
        (_group) =>
          new SelectionGroup(
            _group,
            relationsControl.isItemInGroup($item, _group)
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
    if ($isMobileView) return;
    if ($selectedGroup.id != group.id) groupControl.select(group);
    else groupControl.selectDefault();
  }

  function onRemoveFromGroup(event) {
    if (event.detail.group.id == $selectedGroup.id)
      groupControl.selectDefault();
    relationsControl.removeFrom(event.detail.group, event.detail.item);
  }
  function onAddToGroup(event) {
    relationsControl.addTo(event.detail.group, event.detail.item);
  }
  function showRemoveDialog() {
    isRemoveDialogOpen = true;
  }
  function showGroupsDialog() {
    isGroupsDialogOpen = true;
  }
</script>

<div id="item-view" class:mobile={$isMobileView}>
  {#if $id}
    <ItemViewOptions
      class="options"
      needSave={$needSave}
      expandable={!$isMobileView}
      expanded={$isItemExpanded}
      on:expandtoggle={expandToggle}
      on:remove={showRemoveDialog}
    />
    <div id="groups">
      {#each $groups as group}
        <Bange
          variant={$selectedGroup.id == group.id ? "accent" : "standard"}
          on:click={() => groupClick(group)}
        >
          {group.title}
        </Bange>
      {/each}
      <Bange variant="link" on:click={showGroupsDialog}
        >{@html EditGroupsIcon} {$_("operations.set_groups")}
      </Bange>
    </div>
    <input id="item-title" placeholder="Enter title" bind:value={$title} />
    <textarea
      id="item-content"
      bind:value={$content}
      placeholder="Type content"
    />
  {:else}
    <Placeholder />
  {/if}
  <RemoveItemDialog bind:open={isRemoveDialogOpen} on:remove={removeItem} />
  <EditItemGroupsDialog
    bind:open={isGroupsDialogOpen}
    groups={groupList}
    item={$item}
    on:removefromgroup={onRemoveFromGroup}
    on:addtogroup={onAddToGroup}
  />
</div>

<style lang="scss">
  @use "style.scss";
</style>