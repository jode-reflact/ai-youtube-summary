<template>
  <transition name="slide-up">
    <slot />
  </transition>
</template>

<style lang="scss">
.slide-up {
  &-enter-from,
  &-leave-to {
    transform: translateY(300px) !important;
  }

  &-enter-active,
  &-leave-active {
    transition-property: transform !important;
    transition-duration: 0.2s !important;
    transition-timing-function: ease !important;
  }
}
</style>
