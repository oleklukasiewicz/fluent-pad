<script>
    export let isInteractive = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" on:click class:interactive={isInteractive}>
    <slot />
</div>

<style lang="scss">
   @use "Card.scss"
</style>
