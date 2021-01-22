<template>
  <span class="badge" :class="modifier">
    <slot />
  </span>
</template>

<script>
import { computed } from 'vue';
import {
  PRIMARY,
  DANGER,
  WARNING,
  TYPE_DONE,
  TYPE_ACTIVE,
  TYPE_CANCELLED,
  TYPE_PENDING
} from '../../helpers/constants';

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: val => {
        return [TYPE_DONE, TYPE_ACTIVE, TYPE_CANCELLED, TYPE_PENDING].includes(val);
      }
    }
  },
  setup: props => {
    const modifier = computed(() => ({
      [PRIMARY]: props.type === TYPE_DONE || props.type === TYPE_ACTIVE,
      [DANGER]: props.type === TYPE_CANCELLED,
      [WARNING]: props.type === TYPE_PENDING
    }));

    return {
      modifier
    };
  }
};
</script>
