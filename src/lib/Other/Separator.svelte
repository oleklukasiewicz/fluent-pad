<script lang="ts">
    export let horizontal = false;
</script>

<i class:horizontal />

<style>
    i {
        height: 16px;
        margin: 8px;
        width: 1px;
        min-width: 1px;
        background-color: var(--fds-text-tertiary);
    }
    i.horizontal {
        width: calc(100% - 16px);
        margin: 8px;
        height: 0px;
        background-color: transparent;
        border-top: 1px solid var(--fds-text-tertiary);
        display: table;
    }
</style>
