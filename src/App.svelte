<script lang="ts">
  import "fluent-svelte/theme.css";
  import "./i18n/i18n.ts";

  import Router from "svelte-spa-router";

  import { isLogged } from "./model.js";

  import NavView from "$view/navigation/view.svelte";
  import Group from "$view/groups/view.svelte";
  import Settings from "$view/settings/view.svelte";
  import Login from "$view/login/view.svelte";

  const routes = {
    "/": Group,
    "/settings": Settings,
  };
</script>

<main>
  {#if !$isLogged}
    <Login />
  {:else}
    <NavView>
      <Router {routes} />
    </NavView>
  {/if}
</main>

<style lang="scss" global>
  @use "App.scss";
</style>
