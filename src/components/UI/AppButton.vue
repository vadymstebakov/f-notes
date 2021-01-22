<template>
  <button
      class="btn"
      :class="modifier"
      :disabled="isDisable"
      @click="handleClick"
  >
      <slot />
  </button>
</template>

<script>
import { PRIMARY, DANGER, WARNING } from '../../helpers/constants';

export default {
  emits: {
      action: null
  },
  props: {
      modifier: {
          type: String,
          default: '',
          validator(val) {
              return ['', PRIMARY, DANGER, WARNING].includes(val);
          }
      },
      isDisable: {
          type: Boolean,
          default: false,
      },
      hasClickEvent: {
        type: Boolean,
        default: false,
      }
  },
  setup: (props, { emit }) => {
    const handleClick = () => {
      props.hasClickEvent ? emit('action') : null;
    };

    return {
      handleClick,
    };
  },
}
</script>
