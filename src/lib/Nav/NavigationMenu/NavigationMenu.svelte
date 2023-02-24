<script lang="ts">
    import { IconButton } from "fluent-svelte";

    import NavigationIcon from "@fluentui/svg-icons/icons/navigation_20_regular.svg?raw";

    export let minimal = false;
    export let opened = false;
</script>

<div class="navigation-view">
    {#if minimal}
            <div class="toggle-button">
                <IconButton
                    on:click={() => {
                        opened = !opened;
                    }}
                >
                    {@html NavigationIcon}
                </IconButton>
            </div>
        {/if}
    <div
        class="navigation-view-pane"
        class:opened
        class:minimal
        class:closed={!opened}
    >
        <div class="items">
            <slot name="items" />
        </div>
        <div class="footer">
            <slot name="footer" />
        </div>
    </div>
</div>

<style lang="scss">
    @use "NavigationMenu.scss";
</style>
