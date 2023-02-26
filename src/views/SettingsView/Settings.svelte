<script lang="ts">
    import { isMobileView } from "../../viewModel/SettingsViewModel";

    import { Expander, TextBlock } from "fluent-svelte";
</script>

<div id="settings-view">
    <div id="settings-title" class:mobile={$isMobileView}>
        <TextBlock variant="subtitle">Settings</TextBlock>
    </div>
    <Expander>
        Header
        <svelte:fragment slot="content">Content</svelte:fragment>
    </Expander>
</div>

<style lang="scss">
    @use "Settings.scss";
</style>
