<script>
  import { Flyout, IconButton } from "fluent-svelte";

  import EditIcon from "@fluentui/svg-icons/icons/edit_20_regular.svg?raw";
  import BoldIcon from "@fluentui/svg-icons/icons/text_bold_20_regular.svg?raw";
  import ItalicIcon from "@fluentui/svg-icons/icons/text_italic_20_regular.svg?raw";
  import UnderlineIcon from "@fluentui/svg-icons/icons/text_underline_20_regular.svg?raw";
  import AlignLeftIcon from "@fluentui/svg-icons/icons/text_align_left_20_regular.svg?raw";
  import AlignRightIcon from "@fluentui/svg-icons/icons/text_align_right_20_regular.svg?raw";
  import AlignCenterIcon from "@fluentui/svg-icons/icons/text_align_center_20_regular.svg?raw";
  import JustifyIcon from "@fluentui/svg-icons/icons/text_align_justify_20_regular.svg?raw";
  import AppsListIcon from "@fluentui/svg-icons/icons/apps_list_20_regular.svg?raw";
  import MultiSelectIcon from "@fluentui/svg-icons/icons/multiselect_ltr_20_regular.svg?raw";
  import TabAddIcon from "@fluentui/svg-icons/icons/tab_add_20_regular.svg?raw";

  import Separator from "$shared/Separator/Separator.svelte";
</script>

<div class="item-content-menu">
  <div class="right">
    <IconButton>
        {@html BoldIcon}
      </IconButton>
      <IconButton>
        {@html ItalicIcon}
      </IconButton>
      <IconButton>
        {@html UnderlineIcon}
      </IconButton>
      <Separator />
      <IconButton>
        {@html AlignLeftIcon}
      </IconButton>
      <IconButton>
        {@html AlignCenterIcon}
      </IconButton>
      <IconButton>
        {@html AlignRightIcon}
      </IconButton>
      <IconButton>
        {@html JustifyIcon}
      </IconButton>
      <Separator />
      <!-- <IconButton>
        {@html AppsListIcon}
      </IconButton>
      <IconButton>
        {@html MultiSelectIcon}
      </IconButton>
      <Separator /> -->
      <IconButton>
        {@html TabAddIcon}
      </IconButton>
  </div>
  <div class="left">
  </div>
</div>

<style lang="scss">
  @use "ItemContentMenu.scss";
</style>
