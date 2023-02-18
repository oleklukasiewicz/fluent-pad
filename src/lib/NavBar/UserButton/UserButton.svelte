<script>
    import { ListItem,PersonPicture } from "fluent-svelte";
    export let picture = "";
    export let name="";
</script>

<ListItem id="user-button" on:click>
    <PersonPicture size={20} src={picture} alt={name} />
    <span id="user-label">{name || "Logging in"}</span>
    <!-- <InfoBadge id="user-info" /> -->
</ListItem>

<style lang="scss">
    @use "UserButton.scss";
</style>
