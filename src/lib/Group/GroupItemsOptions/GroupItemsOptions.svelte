<script lang="ts">
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import { IconButton, Button, ContentDialog } from "fluent-svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import Separator from "../../Other/Separator/Separator.svelte";
    import type { Group } from "../../../types/data";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";
    import SelectAllIcon from "@fluentui/svg-icons/icons/multiselect_ltr_20_regular.svg?raw";
    import SortIcon from "@fluentui/svg-icons/icons/arrow_sort_20_regular.svg?raw";

    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let isMultipleItemsEnabled: boolean = false;

    let onAdd = () => dispatch("add");
    
    let onEditMultipleItems = () =>
        dispatch("editmultipleitems", { enabled: isMultipleItemsEnabled });

    let isSorterDialogOpen = false;

    function showSorterDialog() {
        isSorterDialogOpen = true;
    }

    let items = group?.items;

    function editMultipleItems() {
        isMultipleItemsEnabled = !isMultipleItemsEnabled;
        onEditMultipleItems();
    }

    $: items = group?.items;
</script>

<div class="group-items-options">
    <div class="options">
        {#if !isMultipleItemsEnabled}
            <div id="right-options">
                <Button
                    id="add-button"
                    variant={"accent"}
                    on:click={onAdd}
                    style="max-height:31px;padding-block:4px;"
                >
                    {@html AddIcon}
                    &nbsp; {$_("operations.add")}
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
            variant={isMultipleItemsEnabled ? "accent" : "standard"}
            on:click={editMultipleItems}
        >
            {@html SelectAllIcon}
        </ToggleIconButton>
    </div>
    <ContentDialog bind:open={isSorterDialogOpen}>
        Sorters
        <svelte:fragment slot="footer">
            <Button on:click={() => (isSorterDialogOpen = false)}
                >{$_("operations.close")}</Button
            >
        </svelte:fragment>
    </ContentDialog>
</div>

<style lang="scss">
    @use "GroupItemsOptions.scss";
</style>
