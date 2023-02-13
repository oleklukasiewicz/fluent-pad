<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { IconButton, Button, ContentDialog } from "fluent-svelte";
    import Separator from "../../Other/Separator/Separator.svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";
    import CheckBoxListItem from "../../Other/CheckBoxListItem/CheckBoxListItem.svelte";

    import DeleteIcon from "@fluentui/svg-icons/icons/delete_16_regular.svg?raw";
    import GroupEditIcon from "@fluentui/svg-icons/icons/glance_horizontal_16_regular.svg?raw";
    import ExpandIcon from "@fluentui/svg-icons/icons/expand_up_left_16_regular.svg?raw";

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
        {@html DeleteIcon}
    </IconButton>
    <IconButton on:click={showGroupsDialog}>
        {@html GroupEditIcon}
    </IconButton>
    <Separator />
    <ToggleIconButton
        on:click={onExpandToggle}
        variant={isExpanded ? "accent" : "standard"}
    >
        {@html ExpandIcon}
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
        {#each groups as groupEntry}
            <CheckBoxListItem
                checked={groupEntry.isItemInGroup}
                on:select={() => onAddToGroup(item, groupEntry.group)}
                on:unselect={() => onRemoveFromGroup(item, groupEntry.group)}
                >{groupEntry.group.title}</CheckBoxListItem
            >
        {/each}
        <svelte:fragment slot="footer">
            <Button variant="accent" on:click={closeGroupsDialog}>Close</Button>
        </svelte:fragment>
    </ContentDialog>
</div>

<style lang="scss">
    @use "ItemViewOptions.scss";
</style>
