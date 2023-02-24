<script lang="ts">
    import { Checkbox, ListItem } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let checked = false;

    let onClick = () => {
        if (!checked) dispatch("select");
        else dispatch("unselect");
    };
</script>

<ListItem>
    <Checkbox bind:checked on:click={onClick}>
        <slot />
    </Checkbox>
</ListItem>
