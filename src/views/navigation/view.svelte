<script lang="ts">
  import {
    groupControl,
    groups,
    itemControl as control,
    selectedGroup,
    userName,
    userPicture,
    logout,
    isGroupsCompact,
    isMobileView,
    groupsLoaded,
    searchGroup,
  } from "./model";

  import { location } from "svelte-spa-router";
  import { _ } from "svelte-v4-i18n";
  import { toUpper } from "lodash";

  import type { Group } from "$type/data";

  import { ListItem as BasicListItem } from "fluent-svelte";

  import GroupList from "$lib/navigation/GroupList/GroupList.svelte";
  import UserButton from "$lib/navigation/UserButton/UserButton.svelte";
  import NavigationMenu from "$lib/navigation/NavigationMenu/NavigationMenu.svelte";
  import ItemListPlaceholder from "$shared/Placeholders/ItemListPlaceholder/ItemListPlaceholder.svelte";
  import SearchBar from "$shared/SearchBar/SearchBar.svelte";
  import ListItem from "$shared/Items/ListItem/ListItem.svelte";

  import CreateGroupDialog from "$dialog/CreateGroupDialog/CreateGroupDialog.svelte";

  import SettingsIcon from "@fluentui/svg-icons/icons/settings_20_regular.svg?raw";

  let isMenuOpened = false;
  let isNewGroupDialogOpen = false;
  let searchSourceData;
  let resultOpened = false;
  let searchResults = [];

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
    isMenuOpened = false;
    if (obj.type === "group") {
      groupControl.select(obj);
    } else {
      control.select(obj);
      if (!obj.groups.includes($selectedGroup.id)) groupControl.selectDefault();
    }
  };
  const openAllResults = (event) => {
    let details = event.detail;
    let results = details.data;

    if (results.length === 0) return;

    searchGroup.items = results;
    searchGroup.title = $_("nav.search_results") + " (" + results.length + ")";

    groupControl.select(searchGroup);
    groupControl.sort(searchGroup, () => 0);
    isMenuOpened = false;
    resultOpened = false;
  };
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
          compact={$isGroupsCompact}
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
      <UserButton name={$userName} picture={$userPicture} on:click={logout} />
      <BasicListItem
        href="#/settings"
        id="settings-button"
        selected={$location === "/settings"}
        on:click={() => (isMenuOpened = false)}
      >
        {@html SettingsIcon}&nbsp; {$_("nav.settings")}
      </BasicListItem>
    </div>
  </NavigationMenu>
  <slot />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="navigation-shadow"
    class:show={isMenuOpened && $isMobileView}
    on:click={() => (isMenuOpened = false)}
  />
  <CreateGroupDialog bind:open={isNewGroupDialogOpen} on:addgroup={addGroup} />
</div>

<style lang="scss">
  @use "style.scss";
</style>
