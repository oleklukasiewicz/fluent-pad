<script lang="ts">
	import Router from "svelte-spa-router";

	import "fluent-svelte/theme.css";

	import GroupListView from "./views/GroupListView.svelte";
	import GroupView from "./views/GroupView.svelte";
	import { isUserLogged } from "./models/UserModel";
	import Settings from "./views/Settings.svelte";
	import Login from "./views/Login.svelte";

	const routes = {
		"/": GroupView,
		"/settings": Settings,
	};
</script>

<main>
	{#if !$isUserLogged}
		<Login />
	{:else}
		<GroupListView>
			<Router {routes} />
		</GroupListView>
	{/if}
</main>

<style type="text/scss">
	:global(body) {
		background-color: var(--fds-solid-background-base);
		color: var(--fds-text-primary);
		padding: 0;
	}
	:global(::selection) {
		background-color: var(--fds-accent-default);
		color: var(--fds-text-on-accent-primary);
	}
	:global(.icon-button.disabled) {
		border-color: var(--control-stroke-default) !important;
		background-color: var(--control-fill-disabled) !important;
		color: var(--text-disabled) !important;
		opacity: 0.3;
		pointer-events: none;
	}
</style>
