<script lang="ts">
    import {
        groupControl,
        groups,
        selectedGroup,
        userName,
        userPicture,
        logout,
        isMobileView,
    } from "../../viewModel/NavViewModel";

    import { location } from "svelte-spa-router";
    import { _ } from "svelte-i18n";

    import type { Group } from "../../types/data";

    import { ListItem } from "fluent-svelte";
    import GroupList from "../../lib/Nav/GroupList/GroupList.svelte";
    import UserButton from "../../lib/Nav/UserButton/UserButton.svelte";
    import NavigationMenu from "../../lib/Nav/NavigationMenu/NavigationMenu.svelte";

    import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg?raw";

    let isMenuOpened = false;

    let onSelect = (event) => {
        isMenuOpened = false;
        groupControl.select(event.detail.group as Group);
    };
    let onGroupAdd = (event) => groupControl.add(event.detail.group as Group);
</script>

<div class="nav-view">
    <NavigationMenu minimal={$isMobileView} bind:opened={isMenuOpened}>
        <div slot="items">
            <GroupList
                groups={$groups}
                defaultGroup={$groups[0]}
                selectedGroup={$location === "/" ? $selectedGroup : {}}
                on:select={onSelect}
                on:addgroup={onGroupAdd}
            />
        </div>
        <div slot="footer">
            <UserButton
                name={$userName}
                picture={$userPicture}
                on:click={logout}
            />
            <ListItem
                href="#/settings"
                id="settings-button"
                selected={$location === "/settings"}
                on:click={() => (isMenuOpened = false)}
            >
                {@html SettingsIcon}&nbsp; {$_("nav.settings")}
            </ListItem>
        </div>
    </NavigationMenu>
    <slot />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="navigation-shadow"
        class:show={isMenuOpened && $isMobileView}
        on:click={() => (isMenuOpened = false)}
    />
</div>

<style lang="scss">
    @use "NavView.scss";
</style>
