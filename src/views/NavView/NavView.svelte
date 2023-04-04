<script lang="ts">
    import {
        groupControl,
        groups,
        selectedGroup,
        userName,
        userPicture,
        logout,
        loading,
        isMobileView,
        groupsLoaded,
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
    import SearchResults from "../../lib/Nav/SearchResults/SearchResults.svelte";
    import ItemListPlaceholder from "../../lib/Other/ItemListPlaceholder/ItemListPlaceholder.svelte";

    let isMenuOpened = false;
    let isNewGroupDialogOpen = false;
    let isSearchResultsOpen = false;

    let searchBox;

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

    let showSearchResults = () => {
        isSearchResultsOpen = true;
    };
</script>

<div class="nav-view">
    <NavigationMenu minimal={$isMobileView} bind:opened={isMenuOpened}>
        <div slot="items">
            <TextBox
                bind:this={searchBox}
                type="search"
                id="search-box"
                placeholder={$_("nav.search")}
                on:search={showSearchResults}
            />
            <SearchResults
                bind:open={isSearchResultsOpen}
                anchorElement={searchBox}
            />
            <br />
            {#if $groupsLoaded}
                <GroupList
                    groups={$groups}
                    defaultGroup={$groups[0]}
                    selectedGroup={$location === "/" ? $selectedGroup : {}}
                    on:select={selectGroup}
                    on:addgroup={showNewGroupDialog}
                />
            {:else}
                {#each Array(5) as i}
                    <ItemListPlaceholder gap/>
                {/each}
            {/if}
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
