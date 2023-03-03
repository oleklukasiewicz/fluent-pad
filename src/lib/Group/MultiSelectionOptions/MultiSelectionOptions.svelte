<script lang="ts">
    import type { Item, Group } from "../../../types/data";

    import { IconButton, TextBlock } from "fluent-svelte";
    import Separator from "../../Other/Separator/Separator.svelte";

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

<div class="selection-menu">
    <TextBlock variant="body" id="selected-items-count">
        {selectedItems.length + " selected"}
    </TextBlock>
    <IconButton
        disabled={items.length === selectedItems.length}
        on:click={selectAll}
    >
        {@html SelectAllOn}
    </IconButton>
    <Separator />
    <IconButton
        disabled={selectedItems.length === 0}
        on:click={editgroups}
    >
        {@html EditGroups}
    </IconButton>
    <Separator />
    <IconButton disabled={selectedItems.length === 0} on:click={removeMultiple}>
        {@html DeleteIcon}
    </IconButton>
</div>

<style lang="scss">
    @use "MultiSelectionOptions.scss";
</style>
