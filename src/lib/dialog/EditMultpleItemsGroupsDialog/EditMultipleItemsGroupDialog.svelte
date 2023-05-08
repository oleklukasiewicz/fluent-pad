<script lang="ts">
    import { _ } from "svelte-i18n";

    import { Button, ContentDialog } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    import CheckBoxListItem from "$shared/CheckBoxListItem/CheckBoxListItem.svelte";
    const dispatch = createEventDispatcher();

    export let open = false;
    export let groups = [];

    let groupsList = [];

    $: if (!open) {
        groupsList = [];
    }

    let setGroups = function () {
        dispatch("setgroup", {
            groups: groupsList,
        });
        closeDialog();
    };
    let addToList = function (group) {
        groupsList.push(group);
    };
    let removeFromList = function (group) {
        groupsList = groupsList.filter((g) => g.id != group.id);
    };
    let closeDialog = function () {
        open = false;
    };
</script>

<ContentDialog
    bind:open
    title={$_("dialogs.edit_groups_of_multiple_items.title")}
    on:backdropclick={closeDialog}
>
    {#each groups as group}
        <CheckBoxListItem
            on:select={() => addToList(group)}
            on:unselect={() => removeFromList(group)}
        >
            {group.title}
        </CheckBoxListItem>
    {/each}
    <div slot="footer" class="footer">
        <Button on:click={setGroups} variant="accent">
            {$_("dialogs.edit_groups_of_multiple_items.set")}
        </Button>
        <Button on:click={closeDialog}>
            {$_("dialogs.edit_groups_of_multiple_items.close")}
        </Button>
    </div>
</ContentDialog>

<style lang="scss">
    .footer {
        display: flex;
        gap: 10px;
        width: 100%;
    }
    :global(.footer > *) {
        flex: 1;
    }
</style>
