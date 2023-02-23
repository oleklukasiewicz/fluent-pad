<script lang="ts">
    export let label;
    export let variant = "standard";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button on:click class:accent={variant == "accent"} class="bange">
    {label}
</button>

<style lang="scss">
   @use "Bange.scss";
</style>
