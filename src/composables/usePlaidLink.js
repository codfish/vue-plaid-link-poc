import { reactive, isRef, toRefs, ref, watch, onBeforeUnmount } from "vue";

const noop = () => {};

export default ({token, ...options}) => {
  const ready = ref(false);
  const openNoOp = () => {
    if (isRef(token) && !token.value || !token) {
      console.warn(
        'use-plaid-link: You cannot call open() without a valid token supplied to usePlaidLink. This is a no-op.'
      );
    }
  };
  const handler = reactive({
    open: openNoOp,
    exit: noop,
    destroy: noop,
  });
  const { open, exit, destroy} = toRefs(handler);
  // const open = ref(openNoOp)
  // const exit = ref(noop)
  // const destroy = ref(noop)
  console.log(handler)

  if (!window.Plaid) {
    console.error('Error loading Plaid');
    return;
  }

  if (isRef(token)) {
    console.log('token is ref', token)
    watch(token, (value) => {
      console.log('watch token,', value)
      if (!value) return;

      const plaid = Plaid.create({ ...options, token: value });
      open.value = plaid.open;
      exit.value = plaid.exit;
      destroy.value = plaid.destroy;
      ready.value = true;
    })
  } else {
    console.log('token is NOT ref', token)
    // passed a string token? just create the link
    const plaid = Plaid.create({ ...options, token });
    open.value = plaid.open;
    exit.value = plaid.exit;
    destroy.value = plaid.destroy;
    ready.value = true;
  }

  onBeforeUnmount(() => handler.destroy());

  return {
    ready,
    open,
    exit,
    destroy,
  };
};
