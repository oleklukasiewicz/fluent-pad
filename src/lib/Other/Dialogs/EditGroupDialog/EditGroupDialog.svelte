<script lang="ts">
    import { _ } from "svelte-i18n";
    import { ContentDialog, Button, TextBox } from "fluent-svelte";
    import { createEventDispatcher } from "svelte";
    import type { Group } from "../../../../types/data";

    let dispatch = createEventDispatcher();

    export let open = false;
    export let group = {} as Group;

    let groupTitle = "";
    let isGroupButtonDisabled = true;

    $: if (!open) groupTitle = group.title;
    $: isGroupButtonDisabled = groupTitle?.trim() == "";

    function editGroup() {
        dispatch("editgroup", {
            title: groupTitle,
        });
        open = false;
    }
    function cancelEditGroup() {
        open = false;
    }
</script>

<ContentDialog {open} title={$_("dialogs.edit_group.title")}>
    <TextBox
        placeholder={$_("dialogs.edit_group.title_placeholder")}
        bind:value={groupTitle}
    />
    <svelte:fragment slot="footer">
        <Button
            variant="accent"
            disabled={isGroupButtonDisabled}
            on:click={editGroup}
        >
            {$_("dialogs.edit_group.edit")}
        </Button>
        <Button on:click={cancelEditGroup}>
            {$_("dialogs.edit_group.cancel")}</Button
        >
    </svelte:fragment>
</ContentDialog>
