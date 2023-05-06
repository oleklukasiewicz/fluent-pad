<script lang="ts">
    export let mode: "stacked" | "sidebyside" = "sidebyside";
    export let opened = false;
    export let hideMaster = false;
</script>

<div
    class="master-detail"
    class:stacked={mode === "stacked"}
    class:opened
    class:closed={!opened}
    class:hide-master={hideMaster}
>
    <div class="master">
        <slot name="master" />
    </div>
    <div class="detail">
        {#if mode === "stacked"}
            <div class="stacked-options">
                <slot name="stacked-options"></slot>
            </div>
        {/if}
        <slot name="detail" />
    </div>
</div>

<style lang="scss">
    @use "MasterDetail.scss";
</style>
