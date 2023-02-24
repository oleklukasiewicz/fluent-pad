<script lang="ts">
    import { _ } from "svelte-i18n";

    import type { Group } from "../../../types/data";

    import { IconButton } from "fluent-svelte";
    import EditGroupDialog from "../../Other/Dialogs/EditGroupDialog/EditGroupDialog.svelte";
    import RemoveGroupDialog from "../../Other/Dialogs/RemoveGroupDialog/RemoveGroupDialog.svelte";

    import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let disableEditGroup: boolean = true;

    let isEditGroupDialogOpen = false;
    let isRemoveDialogOpen = false;

    let onGroupEdit = (event) =>
        dispatch("groupedit", { title: event.detail.title });
    let onRemoveGroup = () => {
        dispatch("removegroup", { group: group });
    };

    function showEditGroupDialog() {
        isEditGroupDialogOpen = true;
    }

    function showRemoveGroupDialog() {
        isRemoveDialogOpen = true;
    }
</script>

<div class="group-options">
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
    <EditGroupDialog
        bind:open={isEditGroupDialogOpen}
        on:editgroup={onGroupEdit}
        {group}
    />
    <RemoveGroupDialog
        bind:open={isRemoveDialogOpen}
        on:removegroup={onRemoveGroup}
    />
</div>

<style lang="scss">
    @use "GroupOptions.scss";
</style>
