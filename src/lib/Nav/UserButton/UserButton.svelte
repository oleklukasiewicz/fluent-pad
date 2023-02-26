<script>
    import { _ } from "svelte-i18n";

    import { ListItem, PersonPicture } from "fluent-svelte";

    import LogoutIcon from "@fluentui/svg-icons/icons/arrow_exit_20_regular.svg?raw";

    export let picture = "";
    export let name = "";
</script>

<ListItem id="user-button" on:click>
    <PersonPicture size={20} src={picture} alt={name} />
    <span id="user-label">{name || $_("nav.logging")}</span>
    <span id="logout-icon">{@html LogoutIcon}</span>
</ListItem>

<style lang="scss">
    @use "UserButton.scss";
</style>
