<script lang="ts">
    import { Button } from "fluent-svelte";
    import { user } from "../models/User";

    function Login() {
        user.login();
    }
</script>

<div>
    <Button variant={"accent"} on:click={Login}>Login via Google</Button>
</div>

<style>
    div {
        vertical-align: middle;
        text-align: center;
    }
</style>
