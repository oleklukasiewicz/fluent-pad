<script lang="ts">
    import { _ } from "svelte-v4-i18n";

    import type { Group } from "$type/data";

    import { IconButton } from "fluent-svelte";
    import CommandBar from "$shared/CommandBar/CommandBar.svelte";

    import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import TextPlaceholder from "$shared/Placeholders/TextPlaceholder/TextPlaceholder.svelte";
    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let loading: boolean = false;
    export let groupeditable: boolean = true;
    export let isreadonly: boolean = false;

    let editGroup = function () {
        dispatch("editgroup");
    };
    let removeGroup = function () {
        dispatch("removegroup");
    };
</script>

<CommandBar class="group-options">
    <svelte:fragment slot="right-options">
        {#if !loading}
        <b class="group-title">{group.title}</b>
        {:else}
        <TextPlaceholder size="24px" class="group-title-placeholder"/>
        {/if}
    </svelte:fragment>
    {#if !isreadonly}
    <IconButton
        id="edit-group-button"
        disabled={!groupeditable}
        on:click={editGroup}
    >
        {@html EditIcon}
    </IconButton>
    <IconButton
        id="remove-group-button"
        disabled={!groupeditable}
        on:click={removeGroup}
    >
        {@html DeleteIcon}
    </IconButton>
    {/if}
</CommandBar>

<style lang="scss">
    @use "GroupOptions.scss";
</style>
