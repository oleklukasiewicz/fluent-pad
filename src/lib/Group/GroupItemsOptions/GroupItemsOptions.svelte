<script lang="ts">
    import { _ } from "svelte-i18n";

    import type { Group } from "../../../types/data";

    import { IconButton, Button } from "fluent-svelte";
    import Separator from "../../Other/Separator/Separator.svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";
    import SelectAllIcon from "@fluentui/svg-icons/icons/multiselect_ltr_20_regular.svg?raw";
    import SortIcon from "@fluentui/svg-icons/icons/arrow_sort_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import ItemSortDialog from "../../Dialogs/ItemSortDialog/ItemSortDialog.svelte";
    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let multiselect: boolean = false;

    let isSorterDialogOpen = false;
    let items;
    $: items = group?.items;

    let onAdd = () => dispatch("add");

    const setMultiSelect = () =>
        dispatch("multiselect", { enabled: multiselect });

    function showSorterDialog() {
        isSorterDialogOpen = true;
    }

    function editMultipleItems() {
        multiselect = !multiselect;
        setMultiSelect();
    }
</script>

<div class="group-items-options">
    <div class="options">
        {#if !multiselect}
            <div id="right-options">
                <Button
                    id="add-button"
                    variant={"accent"}
                    on:click={onAdd}
                    style="max-height:31px;padding-block:4px;"
                >
                    {@html AddIcon}
                    &nbsp; {$_("operations.add_item")}
                </Button>
            </div>
            <IconButton id="sort-button" on:click={showSorterDialog}>
                {@html SortIcon}
            </IconButton>
            <Separator />
        {:else}
            <div id="right-options">
                <slot />
            </div>
        {/if}
        <ToggleIconButton
            id="select-multiple-items-button"
            variant={multiselect ? "accent" : "standard"}
            on:click={editMultipleItems}
        >
            {@html SelectAllIcon}
        </ToggleIconButton>
    </div>
    <ItemSortDialog bind:open={isSorterDialogOpen} on:sort/>
</div>

<style lang="scss">
    @use "GroupItemsOptions.scss";
</style>
