<script lang="ts">
  import {
    isMobileView,
    isGroupsCompactMode,
    isItemsCompactMode,
  } from "$viewModel/SettingsViewModel";

  import {_} from "svelte-i18n";

  import { Expander, TextBlock, ToggleSwitch } from "fluent-svelte";

  import ItemsHeightIcon from "@fluentui/svg-icons/icons/arrow_autofit_height_20_regular.svg?raw";
</script>

<div id="settings-view">
  <div id="settings-title" class:mobile={$isMobileView}>
    <TextBlock variant="subtitle">Settings</TextBlock>
  </div>
  <Expander expanded>
    <TextBlock variant="bodyLarge">{@html ItemsHeightIcon} {$_("settings.display")}</TextBlock>
    <svelte:fragment slot="content">
      <ToggleSwitch bind:checked={$isGroupsCompactMode}>{$_("settings.compactGroups")}</ToggleSwitch>
      <br />
      <ToggleSwitch bind:checked={$isItemsCompactMode}>{$_("settings.compactItems")}</ToggleSwitch>
    </svelte:fragment>
  </Expander>
</div>

<style lang="scss">
  @use "SettingsView.scss";
</style>
