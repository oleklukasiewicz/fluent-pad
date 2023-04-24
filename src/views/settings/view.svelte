<script lang="ts">
  import {
    isMobileView,
    isGroupsCompactMode,
    isItemsCompactMode,
  } from "./model";

  import { _ } from "svelte-i18n";

  import { Expander, TextBlock, ToggleSwitch } from "fluent-svelte";
  import ItemsHeightIcon from "@fluentui/svg-icons/icons/arrow_autofit_height_20_regular.svg?raw";
</script>

<div id="settings-view">
  <div id="settings-title" class:mobile={$isMobileView}>
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
</div>

<style lang="scss">
  @use "style.scss";
</style>
