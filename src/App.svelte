<script lang="ts">
  import Router from "svelte-spa-router";
  import "./i18n/i18n.ts";

  import { isLogged } from "./model.js";

  import "fluent-svelte/theme.css";

  import NavView from "./views/navigation/view.svelte";
  import Group from "./views/groups/view.svelte";
  import Settings from "./views/settings/view.svelte";
  import Login from "./views/login/view.svelte";

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
