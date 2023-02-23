<script lang="ts">
    import {
        control,
        items,
        group,
        selectedItem,
        isDefaultGroup,
        groupControl,
        isListHidden,
        isMobileView,
    } from "../../viewModel/GroupViewModel";

    import {
        derived,
        writable,
        type Readable,
        type Writable,
    } from "svelte/store";

    import { Item, SelectionItem } from "../../types/data";

    import { IconButton } from "fluent-svelte";
    import GroupItemsOptions from "../../lib/Group/GroupItemsOptions/GroupItemsOptions.svelte";
    import GroupOptions from "../../lib/Group/GroupOptions/GroupOptions.svelte";
    import GroupItemsCollection from "../../lib/Group/GroupItemsCollection/GroupItemsCollection.svelte";

    import ItemView from "../ItemView/ItemView.svelte";
    import MultiSelectionOptions from "../../lib/Group/MultiSelectionOptions/MultiSelectionOptions.svelte";
    import MasterDetail from "../../lib/Other/MasterDetail/MasterDetail.svelte";
    import ArrowLeft from "@fluentui/svg-icons/icons/arrow_left_20_regular.svg?raw";

    let isDetailViewOpened = false;

    let onSelect = (event) => {
        isDetailViewOpened = true;
        if (!isMultipleSelectionEnabled) control.select(event.detail.item);
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
            if (items[item.groupIndex]) items[item.groupIndex].selected = value;
            return items;
        });
    };

    let isMultipleSelectionEnabled = false;
    let onEditItems = function (event) {
        isMultipleSelectionEnabled = event.detail.enabled;
        if (!isMultipleSelectionEnabled) {
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
                    disableEditGroup={$isDefaultGroup}
                    on:groupedit={onGroupEdit}
                    on:removegroup={onGroupRemove}
                />
                <GroupItemsOptions
                    on:add={onAdd}
                    on:editmultipleitems={onEditItems}
                    bind:isMultipleItemsEnabled={isMultipleSelectionEnabled}
                    group={$group}
                >
                    <MultiSelectionOptions
                        selectedItems={$selectedItems}
                        items={$items}
                        on:selectall={onMultiSelectAll}
                    />
                </GroupItemsOptions>
                <GroupItemsCollection
                    on:select={onSelect}
                    on:multiselect={onMultiSelect}
                    on:multiunselect={onMultiUnSelect}
                    mode={isMultipleSelectionEnabled
                        ? "multiselect"
                        : $isMobileView
                        ? "click"
                        : "single"}
                    isCompact={false}
                    items={$itemsWithSelection}
                />
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
</div>

<style lang="scss">
    @use "GroupView.scss";
</style>
