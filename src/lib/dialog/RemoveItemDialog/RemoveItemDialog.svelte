<script lang="ts">
    import { _ } from "svelte-v4-i18n";

    import { ContentDialog, Button } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let open = false;

    function removeItem() {
        if (!open) return;
        dispatch("remove");
        closeDialog();
    }

    function closeDialog() {
        open = false;
    }
</script>

<ContentDialog
    title={$_("dialogs.remove_item.title")}
    bind:open
    on:backdropclick={closeDialog}
>
    <svelte:fragment slot="footer">
        <Button variant="accent" on:click={closeDialog}>
            {$_("dialogs.remove_item.cancel")}
        </Button>
        <Button variant="standard" on:click={removeItem}>
            {$_("dialogs.remove_item.remove")}
        </Button>
    </svelte:fragment>
</ContentDialog>
