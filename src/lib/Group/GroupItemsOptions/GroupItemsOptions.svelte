<script lang="ts">
    import { _ } from "svelte-i18n";

    import type { Group,Item  } from "../../../types/data";

    import { IconButton, Button } from "fluent-svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import AddIcon from "@fluentui/svg-icons/icons/add_16_regular.svg?raw";
    import SelectAllIcon from "@fluentui/svg-icons/icons/multiselect_ltr_20_regular.svg?raw";
    import SortIcon from "@fluentui/svg-icons/icons/arrow_sort_20_regular.svg?raw";

    import MultiSelectionOptions from "../MultiSelectionOptions/MultiSelectionOptions.svelte";

    import { createEventDispatcher } from "svelte";
   
    const dispatch = createEventDispatcher();

    export let group: Group = {} as Group;
    export let multiselect: boolean = false;
    export let selectedItems:Item[] = [];

    let items;
    $: items = group?.items;

    let onAdd = () => dispatch("add");

    const setMultiSelect = () =>
        dispatch("multiselect", { enabled: multiselect });

    function sort() {
       dispatch("sort");
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
            <IconButton id="sort-button" on:click={sort}>
                {@html SortIcon}
            </IconButton>
        {:else}
            <div id="right-options">
                <MultiSelectionOptions
                selectedItems={selectedItems}
                items={items}
                on:selectall
                on:editgroups
                on:removemultiple
            />
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
</div>

<style lang="scss">
    @use "GroupItemsOptions.scss";
</style>
