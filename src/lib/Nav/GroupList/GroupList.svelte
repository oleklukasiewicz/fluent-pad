<script lang="ts">
    import { _ } from "svelte-i18n";

    import type { Group } from "../../../types/data";

    import { Button } from "fluent-svelte";
    import ListItem from "../../Other/ListItem/ListItem.svelte";
    import Separator from "../../Other/Separator/Separator.svelte";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import ListGroup from "../../Other/ListGroup/ListGroup.svelte";
    const dispatch = createEventDispatcher();

    export let groups = [];
    export let defaultGroup;

    export let selectedGroup;

    let _groups;

    $: _groups = groups.filter((group) => group.id != defaultGroup.id);

    let onSelect = (group) => {
        if (group.id != selectedGroup.id) {
            dispatch("select", {
                group: group,
            });
        }
    };

    function addNewGroup(event) {
        dispatch("addgroup");
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
        <ListGroup
            {group}
            href="#"
            isCompact={false}
            selected={group.id == selectedGroup.id}
            on:click={() => onSelect(group)}
        />
    {/each}
    <Button id="add-group-button" variant="accent" on:click={addNewGroup}>
        {@html AddIcon}
        &nbsp; {$_("nav.create_group")}
    </Button>
</div>

<style lang="scss">
    @use "GroupList.scss";
</style>
