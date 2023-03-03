<script lang="ts">
    export let variant:"standard"|"accent"|"link" = "standard";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button on:click class:accent={variant == "accent"} class:link={variant=="link"} class="bange">
   <slot/>
</button>

<style lang="scss">
   @use "Bange.scss";
</style>
