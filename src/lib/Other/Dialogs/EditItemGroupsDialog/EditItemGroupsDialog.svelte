<script lang="ts">
    import { _ } from "svelte-i18n";
    
    import { ContentDialog, Button } from "fluent-svelte";
    import CheckBoxListItem from "../../../Other/CheckBoxListItem/CheckBoxListItem.svelte";
    
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    export let open = false;
    export let groups = [];
    export let item;

    function onRemoveFromGroup(item, group) {
        dispatch("removefromgroup", { item: item, group: group });
    }
    function onAddToGroup(item, group) {
        dispatch("addtogroup", { item: item, group: group });
    }

    function closeGroupsDialog() {
        open = false;
    }
</script>

<ContentDialog title={$_("dialogs.edit_groups_of_item.title")} bind:open on:backdropclick={closeGroupsDialog}>
    {#each groups as groupEntry}
        <CheckBoxListItem
            checked={groupEntry.isItemInGroup}
            on:select={() => onAddToGroup(item, groupEntry.group)}
            on:unselect={() => onRemoveFromGroup(item, groupEntry.group)}
            >{groupEntry.group.title}</CheckBoxListItem
        >
    {/each}
    <svelte:fragment slot="footer">
        <Button on:click={closeGroupsDialog}
            >{$_("dialogs.edit_groups_of_item.close")}</Button
        >
    </svelte:fragment>
</ContentDialog>
