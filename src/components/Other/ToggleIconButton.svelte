<script lang="ts">
    import { IconButton } from "fluent-svelte";

    export let variant = "standard";
</script>

<IconButton class={variant} on:click>
    <slot />
</IconButton>

<style>
    :global(.icon-button.accent) {
        background-color: var(--fds-accent-default);
        border-bottom-color: var(--fds-control-stroke-on-accent-secondary);
        color: var(--fds-text-on-accent-primary);
        transition: var(--fds-control-faster-duration) ease border-color;
    }
    :global(.icon-button.accent:hover) {
        background-color: var(--fds-accent-secondary);
    }
    :global(.icon-button.accent:active) {
        background-color: var(--fds-accent-tertiary);
        color: var(--fds-text-on-accent-secondary);
    }
</style>
