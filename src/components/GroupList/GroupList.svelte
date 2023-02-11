<script lang="ts">
    import { Button, ContentDialog, TextBox } from "fluent-svelte";
    import { createEventDispatcher } from "svelte";
    import { Group } from "../../data/Data";

    import ListItem from "../Item/ItemListView/ListItem.svelte";
    import Separator from "../Other/Separator.svelte";

    const dispatch = createEventDispatcher();

    export let groups = [];
    export let defaultGroup;

    export let selectedGroup;

    let _groups;

    $: _groups = groups.slice(1);

    let onSelect = (group) => {
        if (group.id != selectedGroup.id) {
            dispatch("select", {
                group: group,
            });
        }
    };
    let onGroupAdd = (_group) => {
        if (isNewGroupDialogOpen)
            dispatch("addgroup", {
                group: _group,
            });
    };

    let isNewGroupDialogOpen = false;
    let newGroupTitle = "";
    let isCreateGroupButtonDisabled = true;

    $: isCreateGroupButtonDisabled = newGroupTitle.trim() == "";

    function addNewGroup() {
        onGroupAdd(new Group(undefined, newGroupTitle));
        isNewGroupDialogOpen = false;
    }
    function addNewGroupDialog() {
        isNewGroupDialogOpen = true;
    }
    function closeNewGroupDialog() {
        isNewGroupDialogOpen = false;
    }
</script>

<div>
    <ListItem
        item={defaultGroup}
        href="#"
        isCompact={true}
        selected={defaultGroup.id == selectedGroup.id}
        on:click={() => onSelect(defaultGroup)}
    />
    {#if _groups.length > 0}
        <Separator horizontal={true} />
    {/if}
    {#each _groups as group (group.id)}
        <ListItem
            item={group}
            href="#"
            isCompact={true}
            selected={group.id == selectedGroup.id}
            on:click={() => onSelect(group)}
        />
    {/each}
    <Button id="add-group-button" variant="accent" on:click={addNewGroupDialog}>
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8 2.5C8 2.22386 7.77614 2 7.5 2C7.22386 2 7 2.22386 7 2.5V7H2.5C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8H7V12.5C7 12.7761 7.22386 13 7.5 13C7.77614 13 8 12.7761 8 12.5V8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H8V2.5Z"
                fill="currentColor"
            />
        </svg>
        &nbsp; Create group</Button
    >
    <ContentDialog title="Add new group" bind:open={isNewGroupDialogOpen}>
        <TextBox placeholder="Name of group" bind:value={newGroupTitle} />
        <svelte:fragment slot="footer">
            <Button
                variant="accent"
                disabled={isCreateGroupButtonDisabled}
                on:click={addNewGroup}>Create group</Button
            >
            <Button on:click={closeNewGroupDialog}>Cancel</Button>
        </svelte:fragment>
    </ContentDialog>
</div>

<style>
    div {
        flex: 1;
    }
    :global(#add-group-button) {
        width: calc(100% - 12px);
        margin: 6px;
    }
</style>
