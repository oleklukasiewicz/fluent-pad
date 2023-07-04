<script lang="ts">
    import { _ } from "svelte-v4-i18n";
    import { validateTitle } from "../../../helpers";

    import { ContentDialog, Button, TextBox } from "fluent-svelte";
    import { Group } from "$type/data";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let open = false;

    let newGroupTitle = "";
    let isCreateGroupButtonDisabled;

    $: isCreateGroupButtonDisabled = !validateTitle(newGroupTitle || "");

    function addNewGroup() {
        dispatch("addgroup", {
            group: new Group(undefined, newGroupTitle),
        });
        closeDialog();
    }
    function closeDialog() {
        open = false;
    }
</script>

<ContentDialog
    title={$_("dialogs.create_group.title")}
    bind:open
    on:backdropclick={closeDialog}
>
    <TextBox
        placeholder={$_("dialogs.create_group.title_placeholder")}
        bind:value={newGroupTitle}
    />
    <svelte:fragment slot="footer">
        <Button
            variant="accent"
            disabled={isCreateGroupButtonDisabled}
            on:click={addNewGroup}
        >
            {$_("dialogs.create_group.create")}
        </Button>
        <Button on:click={closeDialog}>
            {$_("dialogs.create_group.cancel")}
        </Button>
    </svelte:fragment>
</ContentDialog>
