<script setup>
  import AccountsListVanilla from "./components/AccountsListVanilla.vue";
  import AccountsListComposable from "./components/AccountsListComposable.vue";
  import AccountsListComposableVerify from "./components/AccountsListComposableVerify.vue";
</script>

<template>
  <h2>Vue Plaid Demo!</h2>
  <Suspense>
    <AccountsListVanilla />
    <!-- <AccountsListComposable /> -->
    <!-- <AccountsListComposableVerify /> -->
  </Suspense>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
