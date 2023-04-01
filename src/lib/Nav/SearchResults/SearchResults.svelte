<script lang="ts">
    import { Flyout } from "fluent-svelte";

    export let open: boolean = false;
    export let anchorElement;
</script>

<Flyout
    id="search-results"
    bind:open
    placement="bottom"
    offset={-10}
    {anchorElement}
    alignment="start"
/>

<style lang="scss">
    @use "SearchResults.scss";
</style>
