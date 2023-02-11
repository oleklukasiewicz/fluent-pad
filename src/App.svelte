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
	:global(html, body) {
		position: relative;
		width: 100%;
		height: 100%;
	}

	:global(body) {
		color: #333;
		margin: 0;
		padding: 8px;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}

	:global(a) {
		color: rgb(0, 100, 200);
		text-decoration: none;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	:global(a:visited) {
		color: rgb(0, 80, 160);
	}

	:global(label) {
		display: block;
	}

	:global(input, button, select, textarea) {
		font-family: inherit;
		font-size: inherit;
		-webkit-padding: 0.4em 0;
		padding: 0.4em;
		margin: 0 0 0.5em 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
	}

	:global(input:disabled) {
		color: #ccc;
	}

	:global(button) {
		color: #333;
		background-color: #f4f4f4;
		outline: none;
	}

	:global(button:disabled) {
		color: #999;
	}

	:global(button:not(:disabled):active) {
		background-color: #ddd;
	}

	:global(button:focus) {
		border-color: #666;
	}
</style>
