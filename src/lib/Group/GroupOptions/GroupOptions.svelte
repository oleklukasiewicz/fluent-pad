<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { IconButton, Button, ContentDialog, TextBox } from "fluent-svelte";

    import Separator from "../../Other/Separator/Separator.svelte";
    import type { Group } from "../../../types/Data";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";
    import SelectAllIcon from "@fluentui/svg-icons/icons/multiselect_ltr_16_regular.svg?raw";
    import EditIcon from "@fluentui/svg-icons/icons/edit_16_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_16_regular.svg?raw";
    import SortIcon from "@fluentui/svg-icons/icons/arrow_sort_16_regular.svg?raw";

    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let disableEditGroup: boolean = true;

    let onAdd = () => dispatch("add");
    let onSort = () => dispatch("sort");
    let onFilter = () => dispatch("filter");
    let onGroupEdit = () => dispatch("groupedit", { title: editedGroupTitle });
    let onRemoveGroup = () => {
        if (!isRemoveDialogOpen) return;
        isRemoveDialogOpen = false;
        dispatch("removegroup", { group: group });
    };

    let isSorterDialogOpen = false;
    let isEditGroupDialogOpen = false;
    let isMultipleItemsDialogOpen = false;

    function showSorterDialog() {
        isSorterDialogOpen = true;
    }

    let isEditGroupButtonDisabled = false;
    let isRemoveDialogOpen = false;
    let editedGroupTitle = "";

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

    function showMultipleItemsDialog() {
        isMultipleItemsDialogOpen = true;
    }
    function addMultipleItems() {
        isMultipleItemsDialogOpen = false;
    }
    function cancelMultipleItemsDialog() {
        isMultipleItemsDialogOpen = false;
    }

    $: isEditGroupButtonDisabled = editedGroupTitle.trim() == "";
</script>

<div class="group-options">
    <b class="group-title">{group.title}</b>
    <div class="options">
        <Button
            id="add-button"
            variant={"accent"}
            on:click={onAdd}
            style="max-height:31px;padding-block:4px;"
        >
            {@html AddIcon}
            &nbsp; Add
        </Button>
        <IconButton
            id="select-multiple-items-button"
            on:click={showMultipleItemsDialog}
        >
            {@html SelectAllIcon}
        </IconButton>
        <IconButton id="sort-button" on:click={showSorterDialog}>
            {@html SortIcon}
        </IconButton>
        <Separator />
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

    <ContentDialog
        title={"Add multiple items to " + (group.title || "this group") + " ?"}
        bind:open={isMultipleItemsDialogOpen}
    />
</div>

<style lang="scss">
    @use "GroupOptions.scss";
</style>
