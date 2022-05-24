<script setup>
  import { ref, onMounted, watch } from "vue";
  import {postData,createPlaidLink} from '../utils'

  const token = ref(null);
  const open = ref(() => {});

  const linkNewAccount = async (access_token) => {
    const resp = await postData('http://localhost:6060/api/v1/plaid/init',
      { user_email:'some-test-user@leaflink.com', user_id: "abc123" }
    );
    const data = await resp.json()

    const handler = await createPlaidLink({
      token: data.link_token,
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
    });

    handler.open();
  };

  // watch(token, (value) => {
  //   if (!value) return;

  //   const handler = Plaid.create({
  //     token: value,
  //     env: 'sandbox',
  //     onSuccess: async (public_token, metadata) => {
  //       console.log('onSuccess public_token', public_token)
  //       console.log('onSuccess metadata', metadata)
  //     },
  //     onLoad: () => {},
  //     onExit: (error, metadata) => {
  //       // Save data from the onExit handler
  //       console.error('onExit error', error, 'metadata', metadata);
  //     },
  //     onEvent: (eventName, metadata) => {
  //       console.log('onEvent eventName', eventName)
  //       console.log('onEvent metadata', metadata)
  //     },
  //   });

  //   open.value = handler.open;
  // });


  // onMounted(async () => {
  //   const resp = await postData('http://localhost:6060/api/v1/plaid/init',
  //     { user_email:'some-test-user@leaflink.com', user_id: "abc123" }
  //   );
  //   const data = await resp.json()

  //   console.log(data.link_token)
  //   token.value = data.link_token;
  // })
</script>

<template>
  <button id="link-button" @click="() => linkNewAccount()">Link Account</button>
</template>
