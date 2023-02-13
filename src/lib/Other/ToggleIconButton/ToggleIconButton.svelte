<script lang="ts">
    import { IconButton } from "fluent-svelte";

    export let variant = "standard";
</script>

<IconButton class={variant} on:click>
    <slot />
</IconButton>

<style lang="scss">
    @use "ToggleIconButton.scss"
</style>
