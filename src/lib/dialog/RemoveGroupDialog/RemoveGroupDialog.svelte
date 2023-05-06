<script lang="ts">
    import { _ } from "svelte-i18n";

    import { ContentDialog, Button } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    export let open = false;

    function removeGroup() {
        if (!open) return;
        dispatch("removegroup");
        closeDialog();
    }

    function closeDialog() {
        open = false;
    }
</script>

<ContentDialog
    title={$_("dialogs.remove_group.title")}
    bind:open
    on:backdropclick={closeDialog}
>
    <svelte:fragment slot="footer">
        <Button variant="accent" on:click={closeDialog}>
            {$_("dialogs.remove_group.cancel")}
        </Button>
        <Button variant="standard" on:click={removeGroup}>
            {$_("dialogs.remove_group.remove")}
        </Button>
    </svelte:fragment>
</ContentDialog>
