<script lang="ts">
    import { Button, ContentDialog, TextBox } from "fluent-svelte";
    import { createEventDispatcher } from "svelte";
    import { Group } from "../../../types/Data";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";

    import ListItem from "../../Other/ListItem/ListItem.svelte";
    import Separator from "../../Other/Separator/Separator.svelte";

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
    let onGroupAdd = (_group: Group) => {
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
        {@html AddIcon}
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

<style lang="scss">
    @use "GroupList.scss";
</style>
