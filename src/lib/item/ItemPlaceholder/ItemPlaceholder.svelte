<script lang="ts">
  import { _ } from "svelte-v4-i18n";
</script>

<div class="item-placeholder">
  <h1>{$_("no-item-in-group")}</h1>
</div>

<style lang="scss">
  @use "ItemPlaceholder.scss";
</style>
