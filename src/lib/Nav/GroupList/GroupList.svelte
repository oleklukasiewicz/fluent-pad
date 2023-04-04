<script lang="ts">
    import { _ } from "svelte-i18n";

    import { Button } from "fluent-svelte";
    import ListItem from "../../Other/ListItem/ListItem.svelte";
    import Separator from "../../Other/Separator/Separator.svelte";

    import ListGroup from "../../Other/ListGroup/ListGroup.svelte";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import ItemListPlaceholder from "../../Other/ItemListPlaceholder/ItemListPlaceholder.svelte";
    const dispatch = createEventDispatcher();

    export let groups = [];

    export let defaultGroup;
    export let loading = false;
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

    function addNewGroup() {
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
    {#if loading}
        {#each Array(10) as i}
            <ItemListPlaceholder />
        {/each}
    {:else}
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
    {/if}
</div>

<style lang="scss">
    @use "GroupList.scss";
</style>
