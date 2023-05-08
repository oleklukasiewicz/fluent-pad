<script lang="ts">
    import type { Item } from "$type/data";

    import { IconButton, TextBlock } from "fluent-svelte";
    import Separator from "$shared/Separator/Separator.svelte";
    import CommandBar from "$shared/CommandBar/CommandBar.svelte";

    import SelectAllOn from "@fluentui/svg-icons/icons/select_all_on_20_regular.svg?raw";
    import EditGroups from "@fluentui/svg-icons/icons/channel_add_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_lines_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let items: Item[] = [];
    export let selectedItems: Item[] = [];

    let selectAll = () => dispatch("selectall");

    let editgroups = () => dispatch("editgroups");
    let removeMultiple = () => dispatch("removemultiple");
</script>

<CommandBar>
    <svelte:fragment slot="right-options">
        <div id="selected-items-count">
        <TextBlock variant="body" >
            {selectedItems.length + " selected"}
        </TextBlock>
    </div>
    </svelte:fragment>
    <IconButton
        disabled={items.length === selectedItems.length}
        on:click={selectAll}
    >
        {@html SelectAllOn}
    </IconButton>
    <Separator />
    <IconButton disabled={selectedItems.length === 0} on:click={editgroups}>
        {@html EditGroups}
    </IconButton>
    <Separator />
    <IconButton disabled={selectedItems.length === 0} on:click={removeMultiple}>
        {@html DeleteIcon}
    </IconButton>
</CommandBar>

<style lang="scss">
    @use "MultiSelectionOptions.scss";
</style>
