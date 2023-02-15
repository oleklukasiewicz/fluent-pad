<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        IconButton,
        Button,
        ContentDialog,
        TextBox,
        TextBlock,
    } from "fluent-svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import Separator from "../../Other/Separator/Separator.svelte";
    import type { Group } from "../../../types/Data";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";
    import SelectAllIcon from "@fluentui/svg-icons/icons/multiselect_ltr_20_regular.svg?raw";
    import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";
    import SortIcon from "@fluentui/svg-icons/icons/arrow_sort_20_regular.svg?raw";

    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let disableEditGroup: boolean = true;

    let onAdd = () => dispatch("add");
    let onSort = () => dispatch("sort");
    let onFilter = () => dispatch("filter");
    let onGroupEdit = () => dispatch("groupedit", { title: editedGroupTitle });
    let onEditMultipleItems = () =>
        dispatch("editmultipleitems", { enabled: isMultipleItemsEnabled });
    let onRemoveGroup = () => {
        if (!isRemoveDialogOpen) return;
        isRemoveDialogOpen = false;
        dispatch("removegroup", { group: group });
    };

    let isSorterDialogOpen = false;
    let isEditGroupDialogOpen = false;
    let isMultipleItemsEnabled = false;

    function showSorterDialog() {
        isSorterDialogOpen = true;
    }

    let isEditGroupButtonDisabled = false;
    let isRemoveDialogOpen = false;
    let editedGroupTitle = "";
    let items = group?.items;

    function showEditGroupDialog() {
        isEditGroupDialogOpen = true;
        editedGroupTitle = group.title || "";
    }
    function editGroup() {
        onGroupEdit();
        isEditGroupDialogOpen = false;
    }
    function cancelEditGroup() {
        isEditGroupDialogOpen = false;
    }

    function showRemoveGroupDialog() {
        isRemoveDialogOpen = true;
    }
    function cancelRemoveGroup() {
        isRemoveDialogOpen = false;
    }

    function editMultipleItems() {
        isMultipleItemsEnabled = !isMultipleItemsEnabled;
        onEditMultipleItems();
    }

    $: isEditGroupButtonDisabled = editedGroupTitle.trim() == "";

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
        <span id="items-count"
            >{(items && items?.length !== 0)
                ? items.length + (items.length === 1 ? " Item" : " Items")
                : "No items"}
        </span>
        <Button
            id="add-button"
            variant={"accent"}
            on:click={onAdd}
            style="max-height:31px;padding-block:4px;"
        >
            {@html AddIcon}
            &nbsp; Add
        </Button>
        <Separator/>
        <ToggleIconButton
            id="select-multiple-items-button"
            variant={isMultipleItemsEnabled ? "accent" : "standard"}
            on:click={editMultipleItems}
        >
            {@html SelectAllIcon}
        </ToggleIconButton>
        <IconButton id="sort-button" on:click={showSorterDialog}>
            {@html SortIcon}
        </IconButton>
    </div>
    <ContentDialog bind:open={isSorterDialogOpen}>
        Sorters
        <svelte:fragment slot="footer">
            <Button on:click={() => (isSorterDialogOpen = false)}>Close</Button>
        </svelte:fragment>
    </ContentDialog>
    <ContentDialog
        bind:open={isEditGroupDialogOpen}
        title={"Edit " + (group.title || "group")}
    >
        <TextBox placeholder="Name of group" bind:value={editedGroupTitle} />
        <svelte:fragment slot="footer">
            <Button
                variant="accent"
                disabled={isEditGroupButtonDisabled}
                on:click={editGroup}
            >
                Edit group
            </Button>
            <Button on:click={cancelEditGroup}>Close</Button>
        </svelte:fragment>
    </ContentDialog>
    <ContentDialog
        title={"Do you want to delete " + (group.title || "this group") + " ?"}
        bind:open={isRemoveDialogOpen}
    >
        <svelte:fragment slot="footer">
            <Button variant="accent" on:click={cancelRemoveGroup}>
                No, don't remove
            </Button>
            <Button variant="standard" on:click={onRemoveGroup}>
                Yes, remove group
            </Button>
        </svelte:fragment>
    </ContentDialog>
</div>

<style lang="scss">
    @use "GroupOptions.scss";
</style>
