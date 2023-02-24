<script lang="ts">
    import { _ } from "svelte-i18n";

    import { ContentDialog, Button, TextBox } from "fluent-svelte";
    import { Group } from "../../../../types/data";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let open = false;

    let newGroupTitle = "";
    let isCreateGroupButtonDisabled = true;

    $: isCreateGroupButtonDisabled = newGroupTitle.trim() == "";

    function addNewGroup() {
        dispatch("addgroup", {
            group: new Group(undefined, newGroupTitle),
        });
        open = false;
    }
    function closeNewGroupDialog() {
        open = false;
    }
</script>

<ContentDialog title={$_("dialogs.create_group.title")} bind:open on:backdropclick={closeNewGroupDialog}>
    <TextBox
        placeholder={$_("dialogs.create_group.title_placeholder")}
        bind:value={newGroupTitle}
    />
    <svelte:fragment slot="footer">
        <Button
            variant="accent"
            disabled={isCreateGroupButtonDisabled}
            on:click={addNewGroup}>{$_("dialogs.create_group.create")}</Button
        >
        <Button on:click={closeNewGroupDialog}
            >{$_("dialogs.create_group.cancel")}</Button
        >
    </svelte:fragment>
</ContentDialog>
