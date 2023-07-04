<script lang="ts">
  import { _ } from "svelte-v4-i18n";

  import { Button, IconButton, InfoBadge, TextBlock } from "fluent-svelte";
  import ToggleIconButton from "$shared/ToggleIconButton/ToggleIconButton.svelte";
  import CommandBar from "$shared/CommandBar/CommandBar.svelte";
  import Separator from "$shared/Separator/Separator.svelte";

  import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";
  import ExpandIcon from "@fluentui/svg-icons/icons/expand_up_left_20_regular.svg?raw";
  import SaveItemIcon from "@fluentui/svg-icons/icons/save_edit_20_regular.svg?raw";
  import PersonAddIcon from "@fluentui/svg-icons/icons/person_add_16_regular.svg?raw";
  import EditGroupsIcon20 from "@fluentui/svg-icons/icons/channel_add_20_regular.svg?raw";
  import HistoryIcon from "@fluentui/svg-icons/icons/history_20_regular.svg?raw";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let expanded = false;
  export let expandable = false;
  export let needSave = false;
  export let groupsCount = 0;
  export let showGroups = true;
  let className;
  export { className as class };

  let onExpandToggle = () => {
    if (expanded)
      dispatch("collapse", {
        isExpanded: false,
      });
    else
      dispatch("expand", {
        isExpanded: true,
      });
    expanded = !expanded;
    dispatch("expandtoggle", {
      isExpanded: expanded,
    });
  };

  let itemGroups = () => {
    dispatch("groups");
  };

  let removeItem = () => {
    dispatch("remove");
  };
</script>

<CommandBar class={className}>
  <svelte:fragment slot="right-options">
    {#if needSave}
      <IconButton disabled>{@html SaveItemIcon}</IconButton>
    {/if}
  </svelte:fragment>
  <ToggleIconButton
    disabled={!expandable}
    on:click={onExpandToggle}
    variant={expanded ? "accent" : "standard"}
  >
    {@html ExpandIcon}
  </ToggleIconButton>
  {#if showGroups}
    <IconButton on:click={itemGroups}>
      {@html EditGroupsIcon20}
      {#if groupsCount > 0}
        <TextBlock variant="caption">
          &nbsp;
          {groupsCount}
        </TextBlock>
      {/if}
    </IconButton>
  {/if}
  <Button>
    {@html PersonAddIcon} &nbsp;
    {$_("share")}
  </Button>
  <Separator />
  <IconButton on:click={removeItem}>
    {@html DeleteIcon}
  </IconButton>
  <IconButton>
   {@html HistoryIcon}
  </IconButton>
</CommandBar>

<style lang="scss">
  @use "ItemViewOptions.scss";
</style>
