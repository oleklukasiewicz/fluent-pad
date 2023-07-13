<script lang="ts">
  import type { HistoryItem } from "$src/types/data";

  import FlagIcon from "@fluentui/svg-icons/icons/flag_16_regular.svg?raw";

  export let item: HistoryItem = {} as HistoryItem;
  let diff;
  let added;
  let removed;

  let updateDiffInfo = function (diffInfo) {
    diff = diffInfo;
    added = diff?.filter((part) => part.added).length;
    removed = diff?.filter((part) => part.removed).length;
  };

  $: updateDiffInfo(item.diff);
</script>

<div>
  <div class="item-data">
    <div class="item-title-data">
      {#if item.isRelease}
        <span class="item-icon">{@html FlagIcon}</span>
        <b class="item-title"> {item.id}</b>
      {:else}
        <span class="item-title">{item.id}</span>
      {/if}
    </div>
    <div class="item-diff-data">
     <span class="added">+ {added}</span>
     <span class="removed">- {removed}</span>
    </div>
  </div>
  {#each diff as diffPart}
    <span class:added={diffPart.added} class:removed={diffPart.removed}>
      {diffPart.value}
    </span>
  {/each} 
</div>

<style lang="scss" scoped>
  @import "HistoryItem.scss";
</style>
