<script lang="ts">
    import { _ } from "svelte-v4-i18n";

    import { ContentDialog, Button } from "fluent-svelte";
    import CheckBoxListItem from "$shared/CheckBoxListItem/CheckBoxListItem.svelte";

    import { createEventDispatcher } from "svelte";
    import type { SelectionGroup } from "$type/data";
    const dispatch = createEventDispatcher();

    export let open = false;
    export let groups: SelectionGroup[] = [] as SelectionGroup[];
    export let item;

    function removeItemFromGroup(item, group) {
        dispatch("removefromgroup", { item: item, group: group });
    }
    function addItemToGroup(item, group) {
        dispatch("addtogroup", { item: item, group: group });
    }

    function closeDialog() {
        open = false;
    }
</script>

<ContentDialog
    title={$_("dialogs.edit_groups_of_item.title")}
    bind:open
    on:backdropclick={closeDialog}
>
    {#each groups as selectionGroup}
        <CheckBoxListItem
            checked={selectionGroup.selected}
            on:select={() => addItemToGroup(item, selectionGroup.group)}
            on:unselect={() => removeItemFromGroup(item, selectionGroup.group)}
        >
            {selectionGroup.group.title}
        </CheckBoxListItem>
    {/each}
    <svelte:fragment slot="footer">
        <Button on:click={closeDialog}>
            {$_("dialogs.edit_groups_of_item.close")}
        </Button>
    </svelte:fragment>
</ContentDialog>
