<script lang="ts">
    import {
        groupControl,
        groups,
        selectedGroup,
        userName,
        userPicture,
        logout,
        isMobileView,
        groupsLoaded,
    } from "../../viewModel/NavViewModel";

    import { location } from "svelte-spa-router";
    import { _ } from "svelte-i18n";

    import type { Group } from "$type/data";

    import GroupList from "$lib/Nav/GroupList/GroupList.svelte";
    import UserButton from "$lib/Nav/UserButton/UserButton.svelte";
    import NavigationMenu from "$lib/Nav/NavigationMenu/NavigationMenu.svelte";

    import CreateGroupDialog from "$lib/Dialogs/CreateGroupDialog/CreateGroupDialog.svelte";

    // import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg?raw";
    import ItemListPlaceholder from "$lib/Other/ItemListPlaceholder/ItemListPlaceholder.svelte";
    import SearchBar from "$lib/Other/SearchBar/SearchBar.svelte";
    import { control } from "$viewModel/GroupViewModel";
    import { toUpper } from "lodash";
    import ListGroup from "$lib/Other/ListGroup/ListGroup.svelte";
    import ListItem from "$lib/Other/ListItem/ListItem.svelte";

    let isMenuOpened = false;
    let isNewGroupDialogOpen = false;
    let isSearchResultsOpen = false;
    const searchGroup = groupControl.get("search_group");

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
    let searchSourceData;

    const getSearchSourceData = () => {
        searchSourceData = [...control.getAll()];
    };
    const searchMethod = (text, item) => {
        if (text == "") return false;
        const textUpper = toUpper(text);

        return (
            toUpper(item.title).includes(textUpper) ||
            toUpper(item.content).includes(textUpper)
        );
    };
    const openSearchResults = (obj) => {
        resultOpened = false;
        if (obj.type === "group") {
            groupControl.select(obj);
        } else {
            control.select(obj);
            if (!obj.groups.includes($selectedGroup.id))
                groupControl.selectDefault();
        }
    };
    const openAllResults = (event) => {
        let details = event.detail;
        let results = details.data;
        let text = details.value;

        if (text == "") {
            groupControl.selectDefault();
            return;
        }
        searchGroup.items = results;
        searchGroup.title =
            $_("nav.search_results") + " (" + results.length + ")";

        groupControl.select(searchGroup);
        groupControl.sort(searchGroup, () => 0);
        resultOpened = false;
    };

    let resultOpened = false;
    let searchResults = [];
</script>

<div class="nav-view">
    <NavigationMenu minimal={$isMobileView} bind:opened={isMenuOpened}>
        <div slot="items">
            <SearchBar
                maxResultsCount={3}
                data={searchSourceData}
                bind:results={searchResults}
                {searchMethod}
                bind:open={resultOpened}
                on:showAll={openAllResults}
                on:start={getSearchSourceData}
            >
                <div slot="results">
                    {#each searchResults as result}
                        <ListItem
                            item={result}
                            compact={false}
                            on:click={() => openSearchResults(result)}
                        />
                    {/each}
                </div>
            </SearchBar>
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
                    <ItemListPlaceholder gap />
                {/each}
            {/if}
        </div>
        <div slot="footer">
            <UserButton
                name={$userName}
                picture={$userPicture}
                on:click={logout}
            />
            <!-- <ListItem
                href="#/settings"
                id="settings-button"
                selected={$location === "/settings"}
                on:click={() => (isMenuOpened = false)}
            >
                {@html SettingsIcon}&nbsp; {$_("nav.settings")}
            </ListItem> -->
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
