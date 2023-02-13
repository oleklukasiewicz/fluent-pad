<script lang="ts">
    import { Expander, TextBlock } from "fluent-svelte";
</script>

<div id="settings-view">
    <TextBlock variant="title">Settings</TextBlock>
    <Expander>
        Header
        <svelte:fragment slot="content">Content</svelte:fragment>
    </Expander>
</div>

<style>
    #settings-view {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 8px;
        gap: 12px;
    }
</style>
