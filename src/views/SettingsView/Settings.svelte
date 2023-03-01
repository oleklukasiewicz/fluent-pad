<script lang="ts">
    import { isMobileView } from "../../viewModel/SettingsViewModel";

    import { Expander, TextBlock } from "fluent-svelte";

    import ItemsHeightIcon from "@fluentui/svg-icons/icons/arrow_autofit_height_20_regular.svg?raw";
</script>

<div id="settings-view">
    <div id="settings-title" class:mobile={$isMobileView}>
        <TextBlock variant="subtitle">Settings</TextBlock>
    </div>
    <Expander>
         <TextBlock variant="bodyLarge">{@html ItemsHeightIcon} Items Height</TextBlock>
        <svelte:fragment slot="content">Content</svelte:fragment>
    </Expander>
</div>

<style lang="scss">
    @use "Settings.scss";
</style>
