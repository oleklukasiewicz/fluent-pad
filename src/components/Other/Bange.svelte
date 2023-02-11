<script lang="ts">
    export let label;
    export let variant = "standard";
</script>

<span on:click class:accent={variant == "accent"}>
    {label}
</span>

<style lang="scss">
    span {
        border-radius: 16px;
        user-select: none;
        width: auto;
        display: inline-table;
        box-sizing: border-box;
        padding: 4px 12px;
        background-color: var(--fds-control-fill-default);
        color: var(--fds-text-primary);
        border: 1px solid;
        border-color: var(--fds-control-border-default);
        font-size: var(--fds-caption-font-size);
        transition: var(--fds-control-faster-duration) ease border-color;
        &:hover {
            background-color: var(--fds-control-fill-secondary);
        }
        &:active {
            background-color: var(--fds-control-fill-tertiary);
            color: var(--fds-text-secondary);
        }
    }

    span.accent {
        background-color: var(--fds-accent-default);
        color: var(--fds-text-on-accent-primary);
        &:hover {
            background-color: var(--fds-accent-secondary);
        }
        &:active {
            background-color: var(--fds-accent-tertiary);
            color: var(--fds-text-on-accent-secondary);
        }
    }
</style>
