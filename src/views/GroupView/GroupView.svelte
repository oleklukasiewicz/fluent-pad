<script lang="ts">
    import {
        control,
        items,
        group,
        selectedItem,
        isDefaultGroup,
        groupControl,
        isListHidden,
    } from "../../viewModel/GroupViewModel";

    import {
        derived,
        writable,
        type Readable,
        type Writable,
    } from "svelte/store";

    import { Item, SelectionItem } from "../../types/data";

    import GroupOptions from "../../lib/Group/GroupOptions/GroupOptions.svelte";
    import GroupItemsCollection from "../../lib/Group/GroupItemsCollection/GroupItemsCollection.svelte";

    import ItemView from "../ItemView/ItemView.svelte";
    import MultiSelectionMenu from "../../lib/Group/MultiSelectionMenu/MultiSelectionMenu.svelte";

    let onSelect = (event) => {
        if (!isEditItemsEnabled) control.select(event.detail.item);
    };

    let onAdd = () => {
        let item = new Item(
            undefined,
            "Item " + Math.floor(Math.random() * 30),
            "",
            new Date()
        );
        control.add(item);
    };

    let onGroupEdit = function (event) {
        let _group = $group;
        $group.title = event.detail.title;

        groupControl.update(_group);
    };
    let onGroupRemove = function () {
        groupControl.remove($group);
    };
    const itemsWithSelection: Writable<SelectionItem[]> = writable([]);
    const selectedItems: Readable<Item[]> = derived(
        itemsWithSelection,
        ($itemsWithSelection) =>
            $itemsWithSelection
                .filter((item) => item.selected)
                .map((item) => item.item)
    );

    items.subscribe((items) => {
        itemsWithSelection.set(
            items.map(
                (item) => new SelectionItem(item, item.id === $selectedItem?.id)
            )
        );
    });
    selectedItem.subscribe((item) => {
        itemsWithSelection.update((items) => {
            let index = items.findIndex((i) => i.item.id === item?.id);
            if (index !== -1) items[index].selected = true;
            return items;
        });
    });

    const setAllItemsToValue = (value: boolean) => {
        itemsWithSelection.update((items) => {
            items.forEach((item) => (item.selected = value));
            return items;
        });
    };
    const updateItemSelection = (item: Item, value: boolean) => {
        itemsWithSelection.update((items) => {
            let index = items.findIndex((i) => i.item.id === item.id);
            if (index !== -1) items[index].selected = value;
            return items;
        });
    };

    let isEditItemsEnabled = false;
    let onEditItems = function (event) {
        isEditItemsEnabled = event.detail.enabled;
        if (!isEditItemsEnabled) {
            setAllItemsToValue(false);
            updateItemSelection($selectedItem, true);
        }
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
    let onMultiUnSelectAll = function () {
        setAllItemsToValue(false);
    };
</script>

<div id="group-view">
    {#if !$isListHidden}
        <div id="item-list-grid">
            <GroupOptions
                on:add={onAdd}
                on:editmultipleitems={onEditItems}
                on:groupedit={onGroupEdit}
                on:removegroup={onGroupRemove}
                group={$group}
                disableEditGroup={$isDefaultGroup}
            >
                <MultiSelectionMenu
                    selectedItems={$selectedItems}
                    items={$items}
                    on:selectall={onMultiSelectAll}
                    on:unselectall={onMultiUnSelectAll}
                />
            </GroupOptions>
            <GroupItemsCollection
                on:select={onSelect}
                on:multiselect={onMultiSelect}
                on:multiunselect={onMultiUnSelect}
                isMultiselect={isEditItemsEnabled}
                isCompact={false}
                items={$itemsWithSelection}
            />
        </div>
    {/if}
    <div id="item-container">
        <ItemView />
    </div>
</div>

<style lang="scss">
    @use "GroupView.scss";
</style>
