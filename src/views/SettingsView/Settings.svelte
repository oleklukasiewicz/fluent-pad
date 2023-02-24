<script lang="ts">
    import { Expander, TextBlock } from "fluent-svelte";
</script>

<div id="settings-view">
    <TextBlock variant="title">Settings</TextBlock>
    <Expander>
        Header
        <svelte:fragment slot="content">Content</svelte:fragment>
    </Expander>
</div>

<style lang="scss">
    @use "Settings.scss";
</style>
