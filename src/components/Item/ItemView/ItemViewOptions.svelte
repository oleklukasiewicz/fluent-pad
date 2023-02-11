<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { IconButton, Button, ContentDialog } from "fluent-svelte";
    import Separator from "../../Other/Separator.svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton.svelte";
    import CheckBoxListItem from "../../Other/CheckBoxListItem.svelte";

    const dispatch = createEventDispatcher();

    export let groups = [];
    export let item;
    export let isExpanded = false;
    export let isRemoveDialogOpen = false;
    export let isGroupsDialogOpen = false;

    let onExpandToggle = () => {
        if (isExpanded)
            dispatch("collapse", {
                isExpanded: false,
            });
        else
            dispatch("expand", {
                isExpanded: true,
            });
        isExpanded = !isExpanded;
        dispatch("expandtoggle", {
            isExpanded: isExpanded,
        });
    };

    let onRemove = () => {
        if (!isRemoveDialogOpen) return;
        isRemoveDialogOpen = false;
        dispatch("remove");
    };
    //let onGroupsEdit = () => dispatch("groupedit");

    let onRemoveFromGroup = (item, group) =>
        dispatch("removefromgroup", { item: item, group: group });
    let onAddToGroup = (item, group) =>
        dispatch("addtogroup", { item: item, group: group });

    function showRemoveDialog() {
        isRemoveDialogOpen = true;
    }
    function cancelRemoveItem() {
        isRemoveDialogOpen = false;
    }
    function showGroupsDialog() {
        isGroupsDialogOpen = true;
    }
    function closeGroupsDialog() {
        isGroupsDialogOpen = false;
    }
</script>

<div class="options">
    <IconButton on:click={showRemoveDialog}>
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
    <IconButton on:click={showGroupsDialog}>
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.5 2C2.67157 2 2 2.67157 2 3.5V5.5C2 6.32843 2.67157 7 3.5 7H5.5C6.32843 7 7 6.32843 7 5.5V3.5C7 2.67157 6.32843 2 5.5 2H3.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5.5C5.77614 3 6 3.22386 6 3.5V5.5C6 5.77614 5.77614 6 5.5 6H3.5C3.22386 6 3 5.77614 3 5.5V3.5ZM10.5 2C9.67157 2 9 2.67157 9 3.5V5.5C9 6.32843 9.67157 7 10.5 7H12.5C13.3284 7 14 6.32843 14 5.5V3.5C14 2.67157 13.3284 2 12.5 2H10.5ZM10 3.5C10 3.22386 10.2239 3 10.5 3H12.5C12.7761 3 13 3.22386 13 3.5V5.5C13 5.77614 12.7761 6 12.5 6H10.5C10.2239 6 10 5.77614 10 5.5V3.5ZM2 10.5C2 9.67157 2.67157 9 3.5 9H5.5C6.32843 9 7 9.67157 7 10.5V12.5C7 13.3284 6.32843 14 5.5 14H3.5C2.67157 14 2 13.3284 2 12.5V10.5ZM3.5 10C3.22386 10 3 10.2239 3 10.5V12.5C3 12.7761 3.22386 13 3.5 13H5.5C5.77614 13 6 12.7761 6 12.5V10.5C6 10.2239 5.77614 10 5.5 10H3.5ZM10.5 9C9.67157 9 9 9.67157 9 10.5V12.5C9 13.3284 9.67157 14 10.5 14H12.5C13.3284 14 14 13.3284 14 12.5V10.5C14 9.67157 13.3284 9 12.5 9H10.5ZM10 10.5C10 10.2239 10.2239 10 10.5 10H12.5C12.7761 10 13 10.2239 13 10.5V12.5C13 12.7761 12.7761 13 12.5 13H10.5C10.2239 13 10 12.7761 10 12.5V10.5Z"
                fill="currentColor"
            />
        </svg>
    </IconButton>
    <Separator />
    <ToggleIconButton
        on:click={onExpandToggle}
        variant={isExpanded ? "accent" : "standard"}
    >
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.23053 2.5C7.23053 2.22386 7.00667 2 6.73053 2H2.49976C2.22361 2 1.99976 2.22386 1.99976 2.5V6.73077C1.99976 7.00691 2.22361 7.23077 2.49976 7.23077C2.7759 7.23077 2.99976 7.00691 2.99976 6.73077V3.70688L6.37697 7.0841C6.57223 7.27936 6.88882 7.27936 7.08408 7.0841C7.27934 6.88883 7.27934 6.57225 7.08408 6.37699L3.70709 3H6.73053C7.00667 3 7.23053 2.77614 7.23053 2.5ZM13.0001 4.5C13.0001 3.67157 12.3285 3 11.5001 3H9.26929C8.99314 3 8.76929 2.77614 8.76929 2.5C8.76929 2.22386 8.99314 2 9.26929 2H11.5001C12.8808 2 14.0001 3.11929 14.0001 4.5V11.5C14.0001 12.8807 12.8808 14 11.5001 14H4.50006C3.11934 14 2.00006 12.8807 2.00006 11.5V9.26923C2.00006 8.99309 2.22391 8.76923 2.50006 8.76923C2.7762 8.76923 3.00006 8.99309 3.00006 9.26923V11.5C3.00006 12.3284 3.67163 13 4.50006 13H8.00006V9.76923C8.00006 8.79211 8.79217 8 9.76929 8H13.0001V4.5ZM13.0001 9H9.76929C9.34445 9 9.00006 9.3444 9.00006 9.76923V13H11.5001C12.3285 13 13.0001 12.3284 13.0001 11.5V9Z"
                fill="currentColor"
            />
        </svg>
    </ToggleIconButton>
    <!-- Content Dialogs -->
    <ContentDialog
        title={"Do you want to delete " + (item.title || "this item") + " ?"}
        bind:open={isRemoveDialogOpen}
    >
        <svelte:fragment slot="footer">
            <Button variant="accent" on:click={cancelRemoveItem}>
                No, don't remove
            </Button>
            <Button variant="standard" on:click={onRemove}>
                Yes, remove item
            </Button>
        </svelte:fragment>
    </ContentDialog>
    <ContentDialog
        title={"Edit groups of " + (item.title || "item")}
        bind:open={isGroupsDialogOpen}
    >
        {#each groups as group}
            <CheckBoxListItem
                checked={group.isItemInGroup}
                on:select={() => onAddToGroup(item, group)}
                on:unselect={() => onRemoveFromGroup(item, group)}
                >{group.title}</CheckBoxListItem
            >
        {/each}
        <svelte:fragment slot="footer">
            <Button variant="accent" on:click={closeGroupsDialog}>Close</Button>
        </svelte:fragment>
    </ContentDialog>
</div>

<style>
    .options {
        display: flex;
        justify-content: right;
        gap: 8px;
    }
</style>
