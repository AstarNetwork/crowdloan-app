<template>
  <li>
    <a
      :href="href"
      class="py-1 hover:underline block"
      target="_blank"
      rel="noopener noreferrer"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true
    }
  }
});
</script>
