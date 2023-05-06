<script lang="ts">
    import { IconButton } from "fluent-svelte";

    export let variant = "standard";
    export let id="";
    export let disabled = false;
</script>

<IconButton class={variant} on:click id={id} disabled={disabled}>
    <slot />
</IconButton>

<style lang="scss">
    @use "ToggleIconButton.scss";
</style>
