<template>
  <button
    @click="$emit(click)"
    class="px-12 py-3 bg-primary text-xl text-white button-gradient"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button-gradient {
  background: linear-gradient(
    83.83deg,
    #694ea4 0%,
    #1b6dc1 37.5%,
    #1b6dc1 65.1%,
    #2ea0c4 100%
  );
  box-shadow: 0px 2px 2px rgb(0 0 0 / 30%);
  border: 0;
  color: #fff;
  transition: all 0.15s ease-in-out;
}
</style>
