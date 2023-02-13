<script lang="ts">
    export let label;
    export let variant = "standard";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click class:accent={variant == "accent"}>
    {label}
</span>

<style lang="scss">
   @use "Bange.scss"
</style>
