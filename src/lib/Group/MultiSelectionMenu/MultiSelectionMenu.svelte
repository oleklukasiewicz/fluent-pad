<script lang="ts">
    import { IconButton, TextBlock } from "fluent-svelte";
    import type { Item } from "../../../types/Data";
    import Separator from "../../Other/Separator/Separator.svelte";

    import SelectAllOn from "@fluentui/svg-icons/icons/select_all_on_20_regular.svg?raw";
    import SelectAllOff from "@fluentui/svg-icons/icons/select_all_off_20_regular.svg?raw";
    import EditGroups from "@fluentui/svg-icons/icons/notepad_edit_20_regular.svg?raw";
    import DeleteIcon from "@fluentui/svg-icons/icons/delete_lines_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let items: Item[] = [];
    export let selectedItems: Item[] = [];

    let onSelectAll = () => dispatch("selectall");
    let onUnSelectAll = () => dispatch("unselectall");

    let onRemoveItems = () => dispatch("removeitems", { items: selectedItems });
    let onGroupEdit = () => dispatch("groupedit", { items: selectedItems });
</script>

<div class="selection-menu">
    <TextBlock variant="body" id="selected-items-count"
        >{selectedItems.length + " selected"}</TextBlock
    >
    <IconButton
        disabled={items.length === selectedItems.length}
        on:click={onSelectAll}
    >
        {@html SelectAllOn}
    </IconButton>
    <IconButton disabled={selectedItems.length === 0} on:click={onUnSelectAll}>
        {@html SelectAllOff}
    </IconButton>
    <Separator />
    <IconButton disabled={selectedItems.length === 0} on:click={onGroupEdit}>
        {@html EditGroups}
    </IconButton>
    <Separator />
    <IconButton disabled={selectedItems.length === 0} on:click={onRemoveItems}>
        {@html DeleteIcon}
    </IconButton>
</div>

<style lang="scss">
    @use "MultiSelectionMenu.scss";
</style>
