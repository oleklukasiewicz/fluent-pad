<script lang="ts">
    import { _ } from "svelte-i18n";

    import type { Group } from "$type/data";

    import { IconButton } from "fluent-svelte";
    import CommandBar from "$lib/Other/CommandBar/CommandBar.svelte";

    import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import TextPlaceholder from "$lib/Other/TextPlaceholder/TextPlaceholder.svelte";
    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let groupeditable: boolean = true;

    let editGroup = function () {
        dispatch("editgroup");
    };
    let removeGroup = function () {
        dispatch("removegroup");
    };
</script>

<CommandBar class="group-options">
    <svelte:fragment slot="right-options">
        {#if group.id}
        <b class="group-title">{group.title}</b>
        {:else}
        <TextPlaceholder size="24px" class="group-title-placeholder"/>
        {/if}
    </svelte:fragment>
    <IconButton
        id="edit-group-button"
        disabled={groupeditable}
        on:click={editGroup}
    >
        {@html EditIcon}
    </IconButton>
    <IconButton
        id="remove-group-button"
        disabled={groupeditable}
        on:click={removeGroup}
    >
        {@html DeleteIcon}
    </IconButton>
</CommandBar>

<style lang="scss">
    @use "GroupOptions.scss";
</style>
