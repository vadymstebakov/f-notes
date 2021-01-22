<template>
  <button class="btn" :class="modifier" :disabled="isDisable" @click="handleClick">
    <slot />
  </button>
</template>

<script>
import { PRIMARY, DANGER, WARNING, TYPE_DONE, TYPE_PENDING, TYPE_CANCELLED } from '../../helpers/constants';

export default {
  emits: {
    action: null
  },
  props: {
    modifier: {
      type: String,
      default: '',
      validator: val => {
        return ['', PRIMARY, DANGER, WARNING].includes(val);
      }
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    hasNotClickEvent: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '',
      required: false,
      validator: val => {
        return ['', TYPE_DONE, TYPE_PENDING, TYPE_CANCELLED].includes(val);
      }
    }
  },
  setup: (props, { emit }) => {
    const handleClick = () => {
      if (props.hasNotClickEvent) {
        return null;
      }

      if (props.type) {
        emit('action', props.type);

        return;
      }

      emit('action')
    };

    return {
      handleClick
    };
  }
};
</script>
