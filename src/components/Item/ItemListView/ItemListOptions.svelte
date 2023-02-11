<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { IconButton, Button, ContentDialog, TextBox } from "fluent-svelte";
    
    import Separator from "../../Other/Separator.svelte";

    const dispatch = createEventDispatcher();

    export let title: string = "";
    export let group: any;
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

    function showSorterDialog() {
        isSorterDialogOpen = true;
    }

    let isEditGroupButtonDisabled = false;
    let editedGroupTitle = title;

    $: editedGroupTitle = title;

    $: isEditGroupButtonDisabled = editedGroupTitle.trim() == "";

    function showEditGroupDialog() {
        isEditGroupDialogOpen = true;
    }
    function editGroup() {
        onGroupEdit();
        isEditGroupDialogOpen = false;
    }

    let isRemoveDialogOpen = false;

    function showRemoveGroupDialog() {
        isRemoveDialogOpen = true;
    }
    function cancelRemoveGroup() {
        isRemoveDialogOpen = false;
    }
</script>

<div class="options">
    <b id="title">{title}</b>
    <Button
        variant={"accent"}
        on:click={onAdd}
        style="max-height:31px;padding-block:4px;"
    >
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5V7H2.5C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8H7V12.5C7 12.7761 7.22386 13 7.5 13C7.77614 13 8 12.7761 8 12.5V8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H8V2.5Z"
                fill="currentColor"
            />
        </svg>
        &nbsp; Add
    </Button>
    <IconButton on:click={showSorterDialog}>
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.85355 2.14645C4.65829 1.95118 4.34171 1.95118 4.14645 2.14645L1.14645 5.14645C0.951184 5.34171 0.951184 5.65829 1.14645 5.85355C1.34171 6.04882 1.65829 6.04882 1.85355 5.85355L4 3.70711V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V3.70711L7.14645 5.85355C7.34171 6.04882 7.65829 6.04882 7.85355 5.85355C8.04882 5.65829 8.04882 5.34171 7.85355 5.14645L4.85355 2.14645ZM11.1525 13.8595C11.3463 14.0468 11.6537 14.0468 11.8475 13.8595L14.8475 10.9594C15.0461 10.7675 15.0514 10.4509 14.8595 10.2524C14.6676 10.0538 14.351 10.0485 14.1525 10.2404L12 12.3212L12 2.5001C12 2.22395 11.7761 2.0001 11.5 2.0001C11.2239 2.0001 11 2.22395 11 2.5001L11 12.3212L8.84752 10.2404C8.64898 10.0485 8.33244 10.0538 8.14051 10.2524C7.94858 10.4509 7.95394 10.7675 8.15248 10.9594L11.1525 13.8595Z"
                fill="currentColor"
            />
        </svg>
    </IconButton>
    <Separator />
    <IconButton disabled={disableEditGroup} on:click={showEditGroupDialog}>
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.4403 2.56066C12.6927 1.81314 11.4808 1.81311 10.7332 2.5606L3.33829 9.95484C3.15725 10.1359 3.02085 10.3566 2.93989 10.5994L2.02567 13.3421C1.96578 13.5218 2.01254 13.7198 2.14646 13.8538C2.28038 13.9877 2.47846 14.0344 2.65813 13.9746L5.40087 13.0603C5.64368 12.9794 5.86432 12.843 6.04531 12.662L13.4402 5.26783C14.1878 4.52029 14.1878 3.30823 13.4403 2.56066ZM11.4403 3.26774C11.7973 2.91074 12.3761 2.91076 12.7331 3.26777C13.0902 3.6248 13.0902 4.20367 12.7331 4.56069L11.9994 5.29437L10.7065 4.00148L11.4403 3.26774ZM9.99934 4.70855L11.2922 6.00145L5.33823 11.9549C5.26701 12.0261 5.18019 12.0798 5.08464 12.1116L3.29058 12.7096L3.88858 10.9157C3.92044 10.8201 3.97412 10.7332 4.04536 10.662L9.99934 4.70855Z"
                fill="currentColor"
            />
        </svg>
    </IconButton>
    <IconButton disabled={disableEditGroup} on:click={showRemoveGroupDialog}>
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 3H9C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3ZM6 3C6 1.89543 6.89543 1 8 1C9.10457 1 10 1.89543 10 3H14C14.2761 3 14.5 3.22386 14.5 3.5C14.5 3.77614 14.2761 4 14 4H13.4364L12.2313 12.8378C12.0624 14.0765 11.0044 15 9.75422 15H6.24578C4.99561 15 3.93762 14.0765 3.76871 12.8378L2.56355 4H2C1.72386 4 1.5 3.77614 1.5 3.5C1.5 3.22386 1.72386 3 2 3H6ZM7 6.5C7 6.22386 6.77614 6 6.5 6C6.22386 6 6 6.22386 6 6.5V11.5C6 11.7761 6.22386 12 6.5 12C6.77614 12 7 11.7761 7 11.5V6.5ZM9.5 6C9.77614 6 10 6.22386 10 6.5V11.5C10 11.7761 9.77614 12 9.5 12C9.22386 12 9 11.7761 9 11.5V6.5C9 6.22386 9.22386 6 9.5 6ZM4.75954 12.7027C4.86089 13.4459 5.49568 14 6.24578 14H9.75422C10.5043 14 11.1391 13.4459 11.2405 12.7027L12.4272 4H3.57281L4.75954 12.7027Z"
                fill="currentColor"
            />
        </svg>
    </IconButton>
    <ContentDialog bind:open={isSorterDialogOpen}>
        Sorters
        <svelte:fragment slot="footer">
            <Button on:click={() => (isSorterDialogOpen = false)}>Close</Button>
        </svelte:fragment>
    </ContentDialog>
    <ContentDialog bind:open={isEditGroupDialogOpen} title="Edit group">
        <TextBox placeholder="Name of group" bind:value={editedGroupTitle} />
        <svelte:fragment slot="footer">
            <Button
                variant="accent"
                disabled={isEditGroupButtonDisabled}
                on:click={editGroup}
            >
                Edit group
            </Button>
            <Button on:click={() => (isEditGroupDialogOpen = false)}
                >Close</Button
            >
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

<style>
    #title {
        flex: 1;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 4px 4px;
    }
    .options {
        display: flex;
        justify-content: right;
        gap: 8px;
    }
</style>
