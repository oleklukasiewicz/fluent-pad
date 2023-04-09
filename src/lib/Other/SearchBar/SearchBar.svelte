<script lang="ts">
    import { _ } from "svelte-i18n";
    import { Button, Flyout, TextBox } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let results = [];
    export let data = [];
    export let maxResultsCount = 5;
    export let open = false;
    export let searchMethod = (text, item, index) => {};
    let inputValue;
    let resultsTrimmed = false;
    let allResults = [];

    const startSearch = () => {
        dispatch("start", { value: inputValue });
    };

    const openResults = () => {
        open = true;
        search(inputValue);
    };
    const closeResults = () => {
        open = false;
    };
    const showAllResults = () => {
        dispatch("showAll", { value: inputValue, data: allResults });
    };
    const search = (text) => {
        allResults = data.filter((item, index) =>
            searchMethod(text, item, index)
        );
        if (allResults.length > maxResultsCount) {
            resultsTrimmed = true;
            results = allResults.slice(0, maxResultsCount);
        } else {
            resultsTrimmed = false;
            results = allResults;
        }
    };
</script>

<div class="search-bar-container">
    <TextBox
        type="search"
        id="search-box"
        bind:value={inputValue}
        placeholder={$_("nav.search")}
        on:search={showAllResults}
        on:input={openResults}
        on:clear={closeResults}
        on:click={startSearch}
    />
    <Flyout
        bind:open
        placement="bottom"
        class="search-bar"
        alignment="start"
        trapFocus={false}
    >
        <svelte:fragment slot="flyout">
            <slot name="results" />
            {#if results.length == 0 && inputValue != ""}
                <div class="search-bar-no-results">
                    {$_("nav.no_results")}
                </div>
            {/if}
            {#if resultsTrimmed}
                <Button class="search-bar-all-items" on:click={showAllResults}
                    >{$_("nav.show_all")} ({allResults.length})</Button
                >
            {/if}
        </svelte:fragment>
    </Flyout>
</div>

<style lang="scss">
    @use "SearchBar.scss";
</style>
