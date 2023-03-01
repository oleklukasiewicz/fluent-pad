<script lang="ts">
	import Router from "svelte-spa-router";
	import "./i18n/i18n.ts";

	import { isLogged } from "./viewModel/AppViewModel";

	import "fluent-svelte/theme.css";

	import NavView from "./views/NavView/NavView.svelte";
	import Group from "./views/GroupView/GroupView.svelte";
	import Settings from "./views/SettingsView/Settings.svelte";
	import Login from "./views/LoginView/LoginView.svelte";

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
