<script lang="ts">
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import { IconButton, Button, ContentDialog, TextBox } from "fluent-svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import Separator from "../../Other/Separator/Separator.svelte";
    import type { Group } from "../../../types/data";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";
    import SelectAllIcon from "@fluentui/svg-icons/icons/multiselect_ltr_20_regular.svg?raw";
    import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";
    import SortIcon from "@fluentui/svg-icons/icons/arrow_sort_20_regular.svg?raw";
    import EditGroupDialog from "../../Other/Dialogs/EditGroupDialog/EditGroupDialog.svelte";
    import RemoveGroupDialog from "../../Other/Dialogs/RemoveGroupDialog/RemoveGroupDialog.svelte";

    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let disableEditGroup: boolean = true;
    export let isMultipleItemsEnabled: boolean = false;

    let onAdd = () => dispatch("add");
    let onSort = () => dispatch("sort");
    let onFilter = () => dispatch("filter");
    
    let onGroupEdit = (event) =>
        dispatch("groupedit", { title: event.detail.title });
    let onEditMultipleItems = () =>
        dispatch("editmultipleitems", { enabled: isMultipleItemsEnabled });
    let onRemoveGroup = () => {
        dispatch("removegroup", { group: group });
    };

    let isSorterDialogOpen = false;
    let isEditGroupDialogOpen = false;

    function showSorterDialog() {
        isSorterDialogOpen = true;
    }

    let isRemoveDialogOpen = false;
    let items = group?.items;

    function showEditGroupDialog() {
        isEditGroupDialogOpen = true;
    }

    function showRemoveGroupDialog() {
        isRemoveDialogOpen = true;
    }

    function editMultipleItems() {
        isMultipleItemsEnabled = !isMultipleItemsEnabled;
        onEditMultipleItems();
    }

    $: items = group?.items;
</script>

<div class="group-options">
    <div class="group-list-options">
        <b class="group-title">{group.title}</b>
        <IconButton
            id="edit-group-button"
            disabled={disableEditGroup}
            on:click={showEditGroupDialog}
        >
            {@html EditIcon}
        </IconButton>
        <IconButton
            id="remove-group-button"
            disabled={disableEditGroup}
            on:click={showRemoveGroupDialog}
        >
            {@html DeleteIcon}
        </IconButton>
    </div>
    <div class="options">
        {#if !isMultipleItemsEnabled}
            <div id="right-options">
                <Button
                    id="add-button"
                    variant={"accent"}
                    on:click={onAdd}
                    style="max-height:31px;padding-block:4px;"
                >
                    {@html AddIcon}
                    &nbsp; {$_("operations.add")}
                </Button>
            </div>
            <IconButton id="sort-button" on:click={showSorterDialog}>
                {@html SortIcon}
            </IconButton>
            <Separator />
        {:else}
            <div id="right-options">
                <slot />
            </div>
        {/if}
        <ToggleIconButton
            id="select-multiple-items-button"
            variant={isMultipleItemsEnabled ? "accent" : "standard"}
            on:click={editMultipleItems}
        >
            {@html SelectAllIcon}
        </ToggleIconButton>
    </div>
    <ContentDialog bind:open={isSorterDialogOpen}>
        Sorters
        <svelte:fragment slot="footer">
            <Button on:click={() => (isSorterDialogOpen = false)}
                >{$_("operations.close")}</Button
            >
        </svelte:fragment>
    </ContentDialog>
    <EditGroupDialog
        bind:open={isEditGroupDialogOpen}
        on:editgroup={onGroupEdit}
        {group}
    />
    <RemoveGroupDialog bind:open={isRemoveDialogOpen} on:removegroup={onRemoveGroup}/>
</div>

<style lang="scss">
    @use "GroupOptions.scss";
</style>
