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

    import { ListItem, TextBox } from "fluent-svelte";
    import GroupList from "../../lib/Nav/GroupList/GroupList.svelte";
    import UserButton from "../../lib/Nav/UserButton/UserButton.svelte";
    import NavigationMenu from "../../lib/Nav/NavigationMenu/NavigationMenu.svelte";

    import CreateGroupDialog from "../../lib/Dialogs/CreateGroupDialog/CreateGroupDialog.svelte";

    import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg?raw";

    let isMenuOpened = false;
    let isNewGroupDialogOpen = false;

    let selectGroup = (event) => {
        isMenuOpened = false;
        groupControl.select(event.detail.group as Group);
    };

    let addGroup = (event) => {
        if (isNewGroupDialogOpen) groupControl.add(event.detail.group as Group);
    };

    let showNewGroupDialog = () => {
        isNewGroupDialogOpen = true;
    };
</script>

<div class="nav-view">
    <NavigationMenu minimal={$isMobileView} bind:opened={isMenuOpened}>
        <div slot="items">
            <TextBox
                type="search"
                id="search-box"
                placeholder={$_("nav.search")}
            />
            <br />
            <GroupList
                groups={$groups}
                defaultGroup={$groups[0]}
                selectedGroup={$location === "/" ? $selectedGroup : {}}
                on:select={selectGroup}
                on:addgroup={showNewGroupDialog}
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
    <CreateGroupDialog
        bind:open={isNewGroupDialogOpen}
        on:addgroup={addGroup}
    />
</div>

<style lang="scss">
    @use "NavView.scss";
</style>
