<script lang="ts">
    import { location } from "svelte-spa-router";

    import {
        control,
        groups,
        selectedGroup,
        userName,
        userPicture,
        logout,
        isMobileView,
    } from "../../viewModel/NavBarViewModel";

    import type { Group } from "../../types/Data";

    import {
        ListItem,
        PersonPicture,
        InfoBadge,
        IconButton,
    } from "fluent-svelte";

    import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg?raw";
    import NavigationIcon from "@fluentui/svg-icons/icons/navigation_20_regular.svg?raw";

    import GroupList from "../../lib/NavBar/GroupList/GroupList.svelte";

    let onSelect = (event) => control.select(event.detail.group as Group);
    let onGroupAdd = (event) => control.add(event.detail.group as Group);

    let isMenuClosed = false;
</script>

<div>
    {#if $isMobileView}
        <IconButton
            id="groups-toggle-button"
            on:click={() => (isMenuClosed = !isMenuClosed)}
            >{@html NavigationIcon}</IconButton
        >
    {/if}
    <div id="nav-bar-view">
        <div
            id="groups-list"
            class:closed={$isMobileView && isMenuClosed}
            class:minimal={$isMobileView}
        >
            <GroupList
                groups={$groups}
                defaultGroup={$groups[0]}
                selectedGroup={$location === "/" ? $selectedGroup : {}}
                on:select={onSelect}
                on:addgroup={onGroupAdd}
            />
            <ListItem id="user-button" on:click={() => logout()}>
                <PersonPicture size={20} src={$userPicture} alt={$userName} />
                <span id="user-label">{$userName || "Logging in"}</span>
                <!-- <InfoBadge id="user-info" /> -->
            </ListItem>
            <ListItem href="#/settings" id="settings-button" selected={$location === "/settings"}>
                {@html SettingsIcon}
                &nbsp; Settings</ListItem
            >
        </div>
        <slot />
    </div>
</div>

<style lang="scss">
    @use "NavView.scss";
</style>
