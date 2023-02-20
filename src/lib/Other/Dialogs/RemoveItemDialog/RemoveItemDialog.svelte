<script lang="ts">
    import { _ } from "svelte-i18n";
    import { ContentDialog, Button } from "fluent-svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let open = false;

    function cancelRemoveItem() {
        open = false;
    }
    function onRemove() {
        if(!open) return;
        dispatch("remove");
        open = false;
    }
</script>

<ContentDialog title={$_("dialogs.remove_item.title")} bind:open on:backdropclick={cancelRemoveItem}>
    <svelte:fragment slot="footer">
        <Button variant="accent" on:click={cancelRemoveItem}>
            {$_("dialogs.remove_item.cancel")}
        </Button>
        <Button variant="standard" on:click={onRemove}>
            {$_("dialogs.remove_item.remove")}
        </Button>
    </svelte:fragment>
</ContentDialog>
