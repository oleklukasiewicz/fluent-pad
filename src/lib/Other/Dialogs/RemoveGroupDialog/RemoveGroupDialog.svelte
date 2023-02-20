<script lang="ts">
    import { _ } from "svelte-i18n";
    import { ContentDialog, Button } from "fluent-svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let open = false;

    function cancelRemoveGroup() {
        open = false;
    }
    function onRemoveGroup() {
        if(!open) return;
        dispatch("removegroup");
        open = false;
    }
</script>

<ContentDialog title={$_("dialogs.remove_group.title")} bind:open on:backdropclick={cancelRemoveGroup}>
    <svelte:fragment slot="footer">
        <Button variant="accent" on:click={cancelRemoveGroup}>
            {$_("dialogs.remove_group.cancel")}
        </Button>
        <Button variant="standard" on:click={onRemoveGroup}>
            {$_("dialogs.remove_group.remove")}
        </Button>
    </svelte:fragment>
</ContentDialog>
