<script lang="ts">
    import { _ } from "svelte-i18n";

    import { Button, ContentDialog } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    import CheckBoxListItem from "../../Other/CheckBoxListItem/CheckBoxListItem.svelte";
    const dispatch = createEventDispatcher();

    export let open = false;
    export let groups = [];

    let addToGroupList = [];

    $: if (!open) {
        addToGroupList = [];
    }

    let setGroups = function () {
        dispatch("setgroup", {
            add: addToGroupList,
        });
        closeDialog();
    };
    let toAddList = function (group) {
        addToGroupList.push(group);
    };
    let toRemoveList = function (group) {
        addToGroupList=addToGroupList.filter((g)=>g.id!=group.id);
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
            on:select={() => toAddList(group)}
            on:unselect={() => toRemoveList(group)}
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