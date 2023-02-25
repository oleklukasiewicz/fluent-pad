<script lang="ts">
    import type { Item, Group } from "../../../types/data";

    import { IconButton, TextBlock } from "fluent-svelte";
    import Separator from "../../Other/Separator/Separator.svelte";

    import SelectAllOn from "@fluentui/svg-icons/icons/select_all_on_20_regular.svg?raw";
    import EditGroups from "@fluentui/svg-icons/icons/channel_add_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_lines_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import EditMultipleItemsGroupDialog from "../../Dialogs/EditMultpleItemsGroupsDialog/EditMultipleItemsGroupDialog.svelte";
    import RemoveMultipleItemsDialog from "../../Dialogs/RemoveMultipleItemsDialog/RemoveMultipleItemsDialog.svelte";
    const dispatch = createEventDispatcher();

    export let items: Item[] = [];
    export let groups: Group[] = [];
    export let selectedItems: Item[] = [];

    let isEditGroupsDialogOpened = false;
    let isRemoveMultipleItemsOpened = false;

    let onSelectAll = () => dispatch("selectall");

    let removeItems = () => dispatch("removeitems", { items: selectedItems });
    let onGroupOfItemsEdit = (remove, add) =>
        dispatch("groupset", { items: selectedItems, remove, add });

    let onGroupsSet = function (event) {
        onGroupOfItemsEdit(event.detail.remove, event.detail.add);
    };

    let showEditGroupsDialog = () => {
        isEditGroupsDialogOpened = true;
    };
    let showRemoveMultipleItemsDialog = () => {
        isRemoveMultipleItemsOpened = true;
    };
</script>

<div class="selection-menu">
    <TextBlock variant="body" id="selected-items-count">
        {selectedItems.length + " selected"}
    </TextBlock>
    <IconButton
        disabled={items.length === selectedItems.length}
        on:click={onSelectAll}
    >
        {@html SelectAllOn}
    </IconButton>
    <Separator />
    <IconButton
        disabled={selectedItems.length === 0}
        on:click={showEditGroupsDialog}
    >
        {@html EditGroups}
    </IconButton>
    <Separator />
    <IconButton disabled={selectedItems.length === 0} on:click={showRemoveMultipleItemsDialog}>
        {@html DeleteIcon}
    </IconButton>
    <EditMultipleItemsGroupDialog
        bind:open={isEditGroupsDialogOpened}
        on:setgroup={onGroupsSet}
        {groups}
    />
    <RemoveMultipleItemsDialog
        bind:open={isRemoveMultipleItemsOpened}
        on:remove={removeItems}
        />
</div>

<style lang="scss">
    @use "MultiSelectionOptions.scss";
</style>
