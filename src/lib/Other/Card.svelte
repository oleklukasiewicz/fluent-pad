<script>
    export let isInteractive = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" on:click class:interactive={isInteractive}>
    <slot />
</div>

<style lang="scss">
    .card {
        padding: 18px;
        background-color: var(--fds-card-background-secondary);
        block-size: auto;
        border: 1px solid var(--fds-card-stroke-default);
        border-radius: var(--fds-overlay-corner-radius);
        box-shadow: var(--fds-card-shadow);

        display: flex;
        flex-direction: column;
        min-block-size: 380px;
        overflow: hidden;
        text-decoration: none;
        transition: var(--fds-control-normal-duration) ease;
        text-align: center;

        &.interactive {
            cursor: pointer;
            &:hover {
                box-shadow: var(--fds-flyout-shadow);
                transform: translateY(-2px);
                background-color: var(--fds-card-background);
            }
        }
    }
</style>
