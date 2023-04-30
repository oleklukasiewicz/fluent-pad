<script lang="ts">
  import {
    isMobileView,
    isGroupsCompactMode,
    isItemsCompactMode,
    isItemGroupsCompact,
    startupGroupId,
    groups,
  } from "./model";

  import { _ } from "svelte-i18n";

  import { ComboBox, Expander, TextBlock, ToggleSwitch } from "fluent-svelte";
  import ItemsHeightIcon from "@fluentui/svg-icons/icons/arrow_autofit_height_20_regular.svg?raw";
  import SettingsCard from "$src/lib/SettingsCard/SettingsCard.svelte";
</script>

<div id="settings-view" class:mobile={$isMobileView}>
  <div id="settings-title">
    <TextBlock variant="subtitle">{$_("nav.settings")}</TextBlock>
  </div>
  <SettingsCard>
    <div class="setting">
      <TextBlock>{$_("settings.startupPlaceholder")}</TextBlock>
      <ComboBox bind:value={$startupGroupId} items={$groups} />
    </div>
  </SettingsCard>
  <Expander expanded title>
    <svelte:fragment slot="icon">
      {@html ItemsHeightIcon}
    </svelte:fragment>
    {$_("settings.display")}
    <svelte:fragment slot="content">
      <div class="setting">
        <TextBlock>{$_("settings.compactGroups")}</TextBlock>
        <ToggleSwitch bind:checked={$isGroupsCompactMode} />
      </div>
      <div class="setting">
        <TextBlock>{$_("settings.compactItems")}</TextBlock>
        <ToggleSwitch bind:checked={$isItemsCompactMode} />
      </div>
      <hr />
      <div class="setting">
        <TextBlock>{$_("settings.compactItemGroups")}</TextBlock>
        <ToggleSwitch bind:checked={$isItemGroupsCompact} />
      </div>
    </svelte:fragment>
  </Expander>
</div>

<style lang="scss">
  @use "style.scss";
</style>
