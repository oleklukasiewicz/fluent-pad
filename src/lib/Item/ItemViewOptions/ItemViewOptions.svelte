<script lang="ts">
    import { _ } from "svelte-i18n";

    import { IconButton } from "fluent-svelte";
    import ToggleIconButton from "../../Other/ToggleIconButton/ToggleIconButton.svelte";

    import DeleteIcon from "@fluentui/svg-icons/icons/delete_20_regular.svg?raw";
    import ExpandIcon from "@fluentui/svg-icons/icons/expand_up_left_20_regular.svg?raw";

    import { createEventDispatcher } from "svelte";
    import CommandBar from "../../Other/CommandBar/CommandBar.svelte";
    import Separator from "../../Other/Separator/Separator.svelte";
    const dispatch = createEventDispatcher();

    export let expanded = false;
    export let expandable = false;

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

    let removeItem = () => {
        dispatch("remove");
    };
</script>

<CommandBar>
    <IconButton on:click={removeItem}>
        {@html DeleteIcon}
    </IconButton>
    <Separator/>
    <ToggleIconButton
            disabled={!expandable}
            on:click={onExpandToggle}
            variant={expanded ? "accent" : "standard"}
        >
            {@html ExpandIcon}
        </ToggleIconButton>
</CommandBar>
