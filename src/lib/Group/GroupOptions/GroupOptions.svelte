<script lang="ts">
    import { _ } from "svelte-i18n";

    import type { Group } from "../../../types/data";

    import { IconButton } from "fluent-svelte";
    import CommandBar from "../../Other/CommandBar/CommandBar.svelte";

    import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
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
        <b class="group-title">{group.title}</b>
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
