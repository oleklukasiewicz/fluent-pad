<script lang="ts">
    import { login } from "./model";

    import { Button, TextBlock } from "fluent-svelte";
    import Card from "$lib/Other/Card/Card.svelte";
</script>

<div id="outer">
    <div>
        <TextBlock variant="subtitle">Welcome to</TextBlock>
        <br />
        <TextBlock variant="titleLarge">Fluent pad</TextBlock>
        <br /><br />
        <div id="options-list">
            <Card>
                <TextBlock variant="subtitle">Login via Google</TextBlock>
                <img id="main-img" src="/vite.svg" alt="Logo" />
                <Button variant={"accent"} on:click={login}>Login</Button>
            </Card>
            <Card>
                <TextBlock variant="subtitle">Continue as Guest</TextBlock>
                <div style="flex:1;" />
                <Button disabled>Continue</Button>
            </Card>
        </div>
    </div>
</div>

<style lang="scss">
    @use "style.scss";
</style>
