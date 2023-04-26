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

  import Separator from "$src/lib/Other/Separator/Separator.svelte";
</script>
<Flyout class="item-content-menu">
    <IconButton>
        {@html EditIcon}
    </IconButton>
    <svelte:fragment slot="flyout">
    <IconButton>
        {@html BoldIcon}
    </IconButton>
    <IconButton>
        {@html ItalicIcon}
    </IconButton>
    <IconButton>
        {@html UnderlineIcon}
    </IconButton>
    <Separator/>
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
    </svelte:fragment>
</Flyout>
<style lang="scss">
    @use "ItemContentMenu.scss";
</style>