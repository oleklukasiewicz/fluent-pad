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
      <div class="setting">
        <TextBlock>{$_("settings.compactGroups")}</TextBlock>
        <ToggleSwitch bind:checked={$isGroupsCompactMode} />
        {$_("settings.compactItems")}
        <ToggleSwitch bind:checked={$isItemsCompactMode} />
      </div>
    </svelte:fragment>
  </Expander>
  <Expander title>
    <svelte:fragment slot="icon">
      {@html StartupIcon}
    </svelte:fragment>
    {$_("settings.startup")}
    <svelte:fragment slot="content">
      <div class="setting">
        <TextBlock>{$_("settings.startupPlaceholder")}</TextBlock>
        <ComboBox bind:value={$startupGroupId} items={$groups} />
      </div>
    </svelte:fragment>
  </Expander>
</div>

<style lang="scss">
  @use "style.scss";
</style>
