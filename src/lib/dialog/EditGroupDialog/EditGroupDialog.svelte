<script lang="ts">
    import { _ } from "svelte-v4-i18n";
    import { validateTitle } from "../../../helpers";

    import type { Group } from "$type/data";

    import { ContentDialog, Button, TextBox } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let open = false;
    export let group = {} as Group;

    let groupTitle = "";
    let isGroupButtonDisabled = true;

    $: if (!open) groupTitle = group.title;
    $: isGroupButtonDisabled = !validateTitle(groupTitle || "");

    function editGroup() {
        dispatch("editgroup", {
            title: groupTitle,
        });
        closeDialog();
    }
    function closeDialog() {
        open = false;
    }
</script>

<ContentDialog
    {open}
    title={$_("dialogs.edit_group.title")}
    on:backdropclick={closeDialog}
>
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
        <Button on:click={closeDialog}>
            {$_("dialogs.edit_group.cancel")}
        </Button>
    </svelte:fragment>
</ContentDialog>
