<script lang="ts">
  import type { HistoryItem } from "$src/types/data";
  import HistoryItemComponent from "../HistoryItem/HistoryItem.svelte";

  export let history: HistoryItem[] = [];
  export let readOnly = false;
</script>
{#each history as item}
 <HistoryItemComponent {item}/>
{/each}
<style lang="scss">
  @import "History.scss";
</style>
