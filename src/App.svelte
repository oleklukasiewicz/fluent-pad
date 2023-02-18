<script lang="ts">
	import Router from "svelte-spa-router";

	import "fluent-svelte/theme.css";

	import GroupListView from "./views/NavView/NavView.svelte";
	import GroupView from "./views/GroupView/GroupView.svelte";
	import Settings from "./views/SettingsView/Settings.svelte";
	import Login from "./views/LoginView/LoginView.svelte";

	import { isLogged } from "./viewModel/AppViewModel";

	const routes = {
		"/": GroupView,
		"/settings": Settings,
	};
</script>

<main>
	{#if !$isLogged}
		<Login />
	{:else}
		<GroupListView>
			<Router {routes} />
		</GroupListView>
	{/if}
</main>

<style lang="scss" global>
	@use "App.scss"
</style>
