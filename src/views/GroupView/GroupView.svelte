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

    import { Item } from "../../types/data";

    import GroupOptions from "../../lib/Group/GroupOptions/GroupOptions.svelte";
    import GroupItemsCollection from "../../lib/Group/GroupItemsCollection/GroupItemsCollection.svelte";

    import ItemView from "../ItemView/ItemView.svelte";
    import MultiSelectionMenu from "../../lib/Group/MultiSelectionMenu/MultiSelectionMenu.svelte";

    let onSelect = (event) => control.select(event.detail.item);

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

    let isEditItemsEnabled = false;
    let onEditItems = function (event) {
        isEditItemsEnabled = event.detail.enabled;
        if (!isEditItemsEnabled) selectedItems = [];
    };

    let selectedItems = [];
    let onMultiSelect = function (event) {
        let item = event.detail.item;
        selectedItems.splice(item.groupIndex, 0, item);
        selectedItems = selectedItems;
    };
    let onMultiUnSelect = function (event) {
        selectedItems = selectedItems.filter(
            (item) => item.id !== event.detail.item.id
        );
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
                selectedItems={selectedItems}
            />
            <GroupItemsCollection
                on:select={onSelect}
                on:multiselect={onMultiSelect}
                on:multiunselect={onMultiUnSelect}
                isMultiselect={isEditItemsEnabled}
                isCompact={false}
                selectedItem={$selectedItem}
                items={$items}
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
