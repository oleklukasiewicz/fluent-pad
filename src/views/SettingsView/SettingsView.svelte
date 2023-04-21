<script lang="ts">
  import {
    isMobileView,
    isGroupsCompactMode,
    isItemsCompactMode,
  } from "$viewModel/SettingsViewModel";

  import {_} from "svelte-i18n";

  import { Expander, TextBlock, ToggleSwitch } from "fluent-svelte";

</script>

<div id="settings-view">
  <div id="settings-title" class:mobile={$isMobileView}>
    <TextBlock variant="subtitle">{$_("nav.settings")}</TextBlock>
  </div>
  <Expander expanded title>
   {$_("settings.display")}
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
