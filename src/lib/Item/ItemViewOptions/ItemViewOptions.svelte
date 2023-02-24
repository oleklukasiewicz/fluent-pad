<script lang="ts">
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";

    import { IconButton } from "fluent-svelte";
    import Separator from "../../Other/Separator/Separator.svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";
    import GroupEditIcon from "@fluentui/svg-icons/icons/channel_20_regular.svg?raw";
    import ExpandIcon from "@fluentui/svg-icons/icons/expand_up_left_20_regular.svg?raw";
    import EditItemGroupsDialog from "../../Other/Dialogs/EditItemGroupsDialog/EditItemGroupsDialog.svelte";
    import RemoveItemDialog from "../../Other/Dialogs/RemoveItemDialog/RemoveItemDialog.svelte";

    const dispatch = createEventDispatcher();

    export let groups = [];
    export let item;
    export let isExpanded = false;
    export let canExpand = false;
    
    let isRemoveDialogOpen = false;
    let isGroupsDialogOpen = false;

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
        dispatch("remove");
    };

    let onRemoveFromGroup = (event) =>
        dispatch("removefromgroup", {
            item: event.detail.item,
            group: event.detail.group,
        });
    let onAddToGroup = (event) =>
        dispatch("addtogroup", {
            item: event.detail.item,
            group: event.detail.group,
        });

    function showRemoveDialog() {
        isRemoveDialogOpen = true;
    }
    function showGroupsDialog() {
        isGroupsDialogOpen = true;
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
        disabled={!canExpand}
        on:click={onExpandToggle}
        variant={isExpanded ? "accent" : "standard"}
    >
        {@html ExpandIcon}
    </ToggleIconButton>
    <!-- Content Dialogs -->
    <RemoveItemDialog bind:open={isRemoveDialogOpen} on:remove={onRemove} />
    <EditItemGroupsDialog
        bind:open={isGroupsDialogOpen}
        {groups}
        {item}
        on:removefromgroup={onRemoveFromGroup}
        on:addtogroup={onAddToGroup}
    />
</div>

<style lang="scss">
    @use "ItemViewOptions.scss";
</style>
