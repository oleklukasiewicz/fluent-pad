<script lang="ts">
    import { Button, TextBlock } from "fluent-svelte";
    import Card from "../lib/Other/Card.svelte";
    import { user } from "../models/User";

    function Login() {
        user.login();
    }
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
                <Button variant={"accent"} on:click={Login}>Login</Button>
            </Card>
            <Card>
                <TextBlock variant="subtitle">Continue as Guest</TextBlock>
                <div style="flex:1;"></div>
                <Button disabled>Continue</Button>
                </Card>
        </div>
    </div>
</div>

<style lang="scss">
    #main-img {
        display: block;
        margin: 8px auto;
        width: 50%;
        flex: 1;
    }
    #outer {
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    #outer > div {
        vertical-align: middle;
        text-align: center;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        min-width: 300px;
    }
    #options-list {
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 8px;
        min-width: 650px;
    }
</style>
