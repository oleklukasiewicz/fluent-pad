<script lang="ts">
  import {
    isMobileView,
    isGroupsCompactMode,
    isItemsCompactMode,
    startupGroupId,
    groups,
  } from "./model";

  import { _ } from "svelte-i18n";

  import { ComboBox, Expander, TextBlock, ToggleSwitch } from "fluent-svelte";
  import ItemsHeightIcon from "@fluentui/svg-icons/icons/arrow_autofit_height_20_regular.svg?raw";
  import StartupIcon from "@fluentui/svg-icons/icons/dock_20_regular.svg?raw";
</script>

<div id="settings-view" class:mobile={$isMobileView}>
  <div id="settings-title">
    <TextBlock variant="subtitle">{$_("nav.settings")}</TextBlock>
  </div>
  <Expander expanded title>
    <svelte:fragment slot="icon">
      {@html ItemsHeightIcon}
    </svelte:fragment>
    {$_("settings.display")}
    <svelte:fragment slot="content">
      <ToggleSwitch bind:checked={$isGroupsCompactMode}
        >{$_("settings.compactGroups")}</ToggleSwitch
      >
      <br />
      <ToggleSwitch bind:checked={$isItemsCompactMode}
        >{$_("settings.compactItems")}</ToggleSwitch
      >
    </svelte:fragment>
  </Expander>
  <Expander title>
    <svelte:fragment slot="icon">
      {@html StartupIcon}
    </svelte:fragment>
    {$_("settings.startup")}
    <svelte:fragment slot="content">
      {$_("settings.startupPlaceholder")}
      <ComboBox bind:value={$startupGroupId} items={$groups} />
      <br />
      <br />
      <br />
      <br />
    </svelte:fragment>
  </Expander>
</div>

<style lang="scss">
  @use "style.scss";
</style>
