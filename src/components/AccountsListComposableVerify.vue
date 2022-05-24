<script setup>
  import { ref, reactive } from "vue";
  import usePlaidLink from '../composables/usePlaidLink'
  import { postData, getLinkToken } from '../utils'

  const token = ref(null);
  const accounts = reactive([])

  const newAccountHandler = usePlaidLink({
    token,
    env: 'sandbox',
    onSuccess: async (public_token, metadata) => {
      console.log('onSuccess public_token', public_token)
      console.log('onSuccess metadata', metadata)
    },
    onLoad: () => {},
    onExit: (error, metadata) => {
      // Save data from the onExit handler
      console.error('onExit error', error, 'metadata', metadata);
    },
    onEvent: (eventName, metadata) => {
      console.log('onEvent eventName', eventName)
      console.log('onEvent metadata', metadata)
    },
  })

  new Promise((resolve) => {
    setTimeout(() => {
      accounts.push({name: 'foo'})
      accounts.push({name: 'bar', access_token: '12345'})
      accounts.push({name: 'foo'})
      accounts.push({name: 'foo'})
      resolve()
    }, 2000)
  })

  const linkToken = await getLinkToken();
  token.value = linkToken;
</script>

<template>
  <button id="link-button" @click="() => newAccountHandler.open()" :disabled="!newAccountHandler.ready">Link Account</button>

  <ul>
    <li v-for="account in accounts">{{account.name}} <span><a href="#" v-if="account.access_token">Verify</a></span></li>
  </ul>
</template>
