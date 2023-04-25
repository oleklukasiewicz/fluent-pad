<script lang="ts">
  import {
    control,
    items,
    group,
    groups,
    selectedItem,
    isItemsCompact,
    groupControl,
    isListHidden,
    isMobileView,
    relationsControl,
  } from "./model";

  import {
    derived,
    writable,
    type Readable,
    type Writable,
  } from "svelte/store";

  import { Item, SelectionItem } from "$type/data";

  import { IconButton } from "fluent-svelte";

  import GroupItemsOptions from "$lib/Group/GroupItemsOptions/GroupItemsOptions.svelte";
  import GroupOptions from "$lib/Group/GroupOptions/GroupOptions.svelte";

  import GroupItemsCollection from "$lib/Group/GroupItemsCollection/GroupItemsCollection.svelte";

  import MasterDetail from "$lib/Other/MasterDetail/MasterDetail.svelte";

  import ItemView from "$view/item/view.svelte";

  import ItemSortDialog from "$lib/Dialogs/ItemSortDialog/ItemSortDialog.svelte";
  import EditMultipleItemsGroupDialog from "$lib/Dialogs/EditMultpleItemsGroupsDialog/EditMultipleItemsGroupDialog.svelte";
  import RemoveMultipleItemsDialog from "$lib/Dialogs/RemoveMultipleItemsDialog/RemoveMultipleItemsDialog.svelte";
  import EditGroupDialog from "$lib/Dialogs/EditGroupDialog/EditGroupDialog.svelte";
  import RemoveGroupDialog from "$lib/Dialogs/RemoveGroupDialog/RemoveGroupDialog.svelte";

  import ArrowLeft from "@fluentui/svg-icons/icons/arrow_left_20_regular.svg?raw";
  import ItemListPlaceholder from "$lib/Other/Placeholders/ItemListPlaceholder/ItemListPlaceholder.svelte";

  let isDetailViewOpened = false;
  let isMultipleSelectionEnabled = false;

  let isSorterDialogOpen = false;
  let isEditGroupsDialogOpened = false;
  let isRemoveMultipleItemsOpened = false;
  let isEditGroupDialogOpen = false;
  let isRemoveDialogOpen = false;

  let direction = "asc";
  let sortValue = "title";

  $: $group ? resetGroupMode() : "";

  const itemsWithSelection: Writable<SelectionItem[]> = writable([]);
  const selectedItems: Readable<Item[]> = derived(
    itemsWithSelection,
    ($itemsWithSelection) =>
      $itemsWithSelection
        .filter((item) => item.selected)
        .map((item) => item.item)
  );

  items.subscribe(async (items) => {
    itemsWithSelection.set(
      await items.map(
        (item) => new SelectionItem(item, item.id === $selectedItem?.id)
      )
    );
  });

  selectedItem.subscribe((item) => {
    itemsWithSelection.update((items) => {
      return items.map((_item) => {
        _item.selected = _item.item.id === item?.id;
        return _item;
      });
    });
  });

  let onSelect = (event) => {
    if (!isMultipleSelectionEnabled) {
      isDetailViewOpened = true;
      if ($selectedItem.id != event.detail.item.id) {
        control.select(event.detail.item);
      }
    }
  };

  let resetGroupMode = () => {
    isDetailViewOpened = false;
    isMultipleSelectionEnabled = false;
  };

  let onAdd = () => {
    let item = new Item(
      undefined,
      "Item " + Math.floor(Math.random() * 30),
      "",
      new Date()
    );
    control.add(item);
    isDetailViewOpened = true;
  };

  let onGroupEdit = function (event) {
    $group.title = event.detail.title;
  };
  let onGroupsOfItemsSet = function (event) {
    let groups = event.detail.groups;

    $selectedItems.forEach((item) =>
      relationsControl.setFor(
        item,
        groups.map((group) => group.id)
      )
    );

    if (!groups.includes($group.id)) groupControl.selectDefault();
  };

  let onRemoveMultipleItems = function () {
    $selectedItems.forEach((item) => {
      control.remove(item.id);
    });
  };
  let onGroupRemove = function () {
    groupControl.remove($group.id);
  };

  const setAllItemsToValue = (value: boolean) => {
    itemsWithSelection.update((items) =>
      items.map((item) => {
        item.selected = value;
        return item;
      })
    );
  };

  const updateItemSelection = (
    item: Item,
    value: boolean,
    dontUpdateOthers: boolean = true
  ) => {
    itemsWithSelection.update((items) =>
      items.map((_item) => {
        if (_item.item.id === item.id) {
          _item.selected = value;
        } else {
          if (!dontUpdateOthers) _item.selected = !value;
        }
        return _item;
      })
    );
  };

  const openSortDialog = () => {
    isSorterDialogOpen = true;
  };
  const showEditGroupsDialog = () => {
    isEditGroupsDialogOpened = true;
  };
  const showRemoveMultipleItemsDialog = () => {
    isRemoveMultipleItemsOpened = true;
  };
  function showEditGroupDialog() {
    isEditGroupDialogOpen = true;
  }

  function showRemoveGroupDialog() {
    isRemoveDialogOpen = true;
  }

  const onSort = function (event) {
    sortValue = event.detail.value;
    direction = event.detail.direction;

    groupControl.sort($group, (a, b) => {
      const aValue = a[sortValue];
      const bValue = b[sortValue];

      if (aValue > bValue) return direction == "asc" ? 1 : -1;
      else if (aValue < bValue) return direction == "asc" ? -1 : 1;
      else return 0;
    });
  };

  let onEditItems = function (event) {
    isMultipleSelectionEnabled = event.detail.enabled;
    if (!isMultipleSelectionEnabled)
      updateItemSelection($selectedItem, true, false);
  };

  let onMultiSelect = function (event) {
    updateItemSelection(event.detail.item, true);
  };
  let onMultiUnSelect = function (event) {
    updateItemSelection(event.detail.item, false);
  };
  let onMultiSelectAll = function () {
    setAllItemsToValue(true);
  };
</script>

<div id="group-view">
  <MasterDetail
    hideMaster={$isMobileView ? false : $isListHidden}
    mode={$isMobileView ? "stacked" : "sidebyside"}
    bind:opened={isDetailViewOpened}
  >
    <div slot="master">
      <div id="item-list-grid">
        <GroupOptions
          group={$group}
          groupeditable={$group.flags.isEditable}
          isreadonly={$group.flags.isReadOnly}
          on:editgroup={showEditGroupDialog}
          on:removegroup={showRemoveGroupDialog}
        />
        {#if !$group.flags.isReadOnly}
          <GroupItemsOptions
            on:add={onAdd}
            on:sort={openSortDialog}
            on:multiselect={onEditItems}
            on:selectall={onMultiSelectAll}
            on:editgroups={showEditGroupsDialog}
            on:removemultiple={showRemoveMultipleItemsDialog}
            bind:multiselect={isMultipleSelectionEnabled}
            group={$group}
            selectedItems={$selectedItems}
          />
        {/if}
        {#if $group.flags?.itemsLoaded}
          <GroupItemsCollection
            on:select={onSelect}
            on:multiselect={onMultiSelect}
            on:multiunselect={onMultiUnSelect}
            selection={isMultipleSelectionEnabled
              ? "multi"
              : $isMobileView
              ? "none"
              : "single"}
            compact={$group.flags.isReadOnly ? false : $isItemsCompact}
            items={$itemsWithSelection}
          />
        {:else}
          <div class="items-placeholder">
            {#each Array($group.itemsCount || 10) as i}
              <ItemListPlaceholder compact={$isItemsCompact} />
            {/each}
          </div>
        {/if}
      </div>
    </div>
    <div id="item-container" slot="detail">
      <ItemView />
    </div>
    <div slot="stacked-options" class="master-view-stacked-options">
      <IconButton on:click={() => (isDetailViewOpened = false)}
        >{@html ArrowLeft}</IconButton
      >
    </div>
  </MasterDetail>
  <ItemSortDialog bind:open={isSorterDialogOpen} on:sort={onSort} />
  <EditMultipleItemsGroupDialog
    bind:open={isEditGroupsDialogOpened}
    on:setgroup={onGroupsOfItemsSet}
    groups={$groups}
  />
  <RemoveMultipleItemsDialog
    bind:open={isRemoveMultipleItemsOpened}
    on:remove={onRemoveMultipleItems}
  />
  <EditGroupDialog
    bind:open={isEditGroupDialogOpen}
    on:editgroup={onGroupEdit}
    group={$group}
  />
  <RemoveGroupDialog
    bind:open={isRemoveDialogOpen}
    on:removegroup={onGroupRemove}
  />
</div>

<style lang="scss">
  @use "style.scss";
</style>
