<script lang="ts">
    import { _ } from "svelte-i18n";
    import { Flyout, TextBox } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let results = [];
    export let data = [];
    export let maxResultsCount = 5;
    export let open = false;
    export let searchMethod = (text, item, index) => {};
    let inputValue;
    let resultsTrimmed = false;

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
    const search = (text) => {
        const allResults = data.filter((item, index) =>
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

<div>
    <TextBox
        type="search"
        id="search-box"
        bind:value={inputValue}
        placeholder={$_("nav.search")}
        on:search={openResults}
        on:input={openResults}
        on:clear={closeResults}
        on:click={startSearch}
    />
    <Flyout
        bind:open={open}
        placement="bottom"
        class="search-bar"
        alignment="start"
        trapFocus={false}
    >
        <svelte:fragment slot="flyout">
            <slot name="results" />
        </svelte:fragment>
    </Flyout>
</div>

<style lang="scss">
    @use "Searchbar.scss";
</style>
