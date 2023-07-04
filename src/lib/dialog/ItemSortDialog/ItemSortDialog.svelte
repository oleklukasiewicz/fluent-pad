<script lang="ts">
    import { _ } from "svelte-v4-i18n";
    import {
        ComboBox,
        ContentDialog,
        TextBlock,
        Button,
        RadioButton,
    } from "fluent-svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let open = false;

    function sort() {
        dispatch("sort", { value: sortValue, direction });
        closeDialog();
    }

    function closeDialog() {
        open = false;
    }
    let direction = "asc";
    let sortValue = "title";
</script>

<ContentDialog bind:open>
    <TextBlock variant="subtitle">{$_("dialogs.sort_items.title")}</TextBlock>
    <br /><br />
    <div class="dialog-content">
        <ComboBox
            bind:value={sortValue}
            label="Sort by"
            placeholder="Select an option"
            items={[
                { name: $_("item.title"), value: "title" },
                { name: $_("item.content"), value: "content" },
                { name: $_("item.create_date"), value: "createDate" },
                { name: $_("item.modify_date"), value: "modifyDate" },
            ]}
        />
        <RadioButton bind:group={direction} value="asc">
            <TextBlock>{$_("dialogs.sort_items.ascending")}</TextBlock>
        </RadioButton>
        <RadioButton bind:group={direction} value="desc">
            <TextBlock>{$_("dialogs.sort_items.descending")}</TextBlock>
        </RadioButton>
    </div>
    <svelte:fragment slot="footer">
        <Button variant="accent" on:click={sort}
            >{$_("dialogs.sort_items.sort")}</Button
        >
        <Button on:click={closeDialog}>{$_("dialogs.sort_items.cancel")}</Button>
    </svelte:fragment>
</ContentDialog>

<style lang="scss">
    @use "ItemSortDialog.scss";
</style>
