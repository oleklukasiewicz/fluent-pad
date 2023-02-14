<script lang="ts">
    import { IconButton } from "fluent-svelte";

    export let variant = "standard";
    export let id="";
</script>

<IconButton class={variant} on:click id>
    <slot />
</IconButton>

<style lang="scss">
    @use "ToggleIconButton.scss"
</style>
