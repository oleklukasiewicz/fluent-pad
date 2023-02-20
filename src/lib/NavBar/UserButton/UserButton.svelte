<script>
    import { _ } from "svelte-i18n";

    import { ListItem, PersonPicture } from "fluent-svelte";
    export let picture = "";
    export let name = "";
</script>

<ListItem id="user-button" on:click>
    <PersonPicture size={20} src={picture} alt={name} />
    <span id="user-label">{name || $_("nav.logging")}</span>
</ListItem>

<style lang="scss">
    @use "UserButton.scss";
</style>
