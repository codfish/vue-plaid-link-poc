<script setup>
  import { ref, watch } from "vue";
  import usePlaidLink from '../composables/usePlaidLink'
  import {postData} from '../utils'

  const token = ref(null);

  watch(token, () => {
    alert(token.value)
  })

  function linkAccount() {
    token.value = 'foo'
    // const {open, ready} = usePlaidLink({
    //   token,
    //   env: 'sandbox',
    //   onSuccess: async (public_token, metadata) => {
    //     console.log('onSuccess public_token', public_token)
    //     console.log('onSuccess metadata', metadata)
    //   },
    //   onLoad: () => {},
    //   onExit: (error, metadata) => {
    //     // Save data from the onExit handler
    //     console.error('onExit error', error, 'metadata', metadata);
    //   },
    //   onEvent: (eventName, metadata) => {
    //     console.log('onEvent eventName', eventName)
    //     console.log('onEvent metadata', metadata)
    //   },
    // });

    // open()
  }

  const resp = await postData('http://localhost:6060/api/v1/plaid/init',
    { user_email:'some-test-user@leaflink.com', user_id: "abc123" }
  );
  const data = await resp.json()
  token.value = data.link_token
</script>

<template>
  <button id="link-button" @click="() => linkAccount()">Link Account</button>
</template>
