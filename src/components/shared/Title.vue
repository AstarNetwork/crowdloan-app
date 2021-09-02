<template>
  <h2 class="mb-12 text-5xl lg:text-6xl font-black pb-4 title-gradient">
    <slot></slot>
  </h2>
</template>

<style scoped>
.title-gradient {
  background: linear-gradient(
    89.45deg,
    #0f3f70 1.72%,
    #68316c 15.64%,
    #0f3f70 30.16%,
    #001f40 57.74%,
    #001f40 97.52%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
