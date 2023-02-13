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

    import { Item } from "../../types/Data";

    import GroupOptions from "../../lib/Group/GroupOptions/GroupOptions.svelte";
    import GroupItemsCollection from "../../lib/Group/GroupItemsCollection/GroupItemsCollection.svelte";

    import ItemView from "../ItemView/ItemView.svelte";

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
</script>

<div id="group-view">
    {#if !$isListHidden}
        <div id="item-list-grid">
            <GroupOptions
                on:add={onAdd}
                on:groupedit={onGroupEdit}
                on:removegroup={onGroupRemove}
                group={$group}
                disableEditGroup={$isDefaultGroup}
            />
            <GroupItemsCollection
                on:select={onSelect}
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
