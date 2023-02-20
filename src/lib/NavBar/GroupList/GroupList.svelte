<script lang="ts">
    import { _ } from "svelte-i18n";
    import { Button } from "fluent-svelte";
    import type { Group } from "../../../types/data";
    import { createEventDispatcher } from "svelte";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";

    import ListItem from "../../Other/ListItem/ListItem.svelte";
    import Separator from "../../Other/Separator/Separator.svelte";
    import CreateGroupDialog from "../../Other/Dialogs/CreateGroupDialog/CreateGroupDialog.svelte";

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

    function addNewGroup(event) {
        onGroupAdd(event.detail.group);
    }
    function addNewGroupDialog() {
        isNewGroupDialogOpen = true;
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
        &nbsp; {$_("nav.create_group")}</Button
    >
    <CreateGroupDialog
        bind:open={isNewGroupDialogOpen}
        on:addgroup={addNewGroup}
    />
</div>

<style lang="scss">
    @use "GroupList.scss";
</style>
