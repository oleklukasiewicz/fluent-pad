<script lang="ts">
    import {
        control,
        items,
        group,
        title,
        selectedItem,
        isDefaultGroup,
    } from "../viewModel/ItemListViewModel";
    import { groupControl } from "../viewModel/ItemViewModel";

    import ItemListOptions from "../lib/Item/ItemListView/ItemListOptions.svelte";
    import ItemsCollection from "../lib/Item/ItemListView/ItemsCollection.svelte";

    import {Item} from "../types/Data";

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

<div id="item-list-grid">
    <ItemListOptions
        on:add={onAdd}
        on:groupedit={onGroupEdit}
        on:removegroup={onGroupRemove}
        title={$title}
        group={$group}
        disableEditGroup={$isDefaultGroup}
    />
    <ItemsCollection
        on:select={onSelect}
        isCompact={false}
        selectedItem={$selectedItem}
        items={$items}
    />
</div>

<style>
    #item-list-grid {
        height: 100vh;
        min-width: 250px;
        display: flex;
        flex-direction: column;
        padding: 8px 8px 0px;
        box-sizing: border-box;
    }
</style>
