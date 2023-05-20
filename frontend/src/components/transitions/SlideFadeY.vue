<template>
  <transition name="slide-fade-y">
    <slot />
  </transition>
</template>

<style lang="scss">
.slide-fade-y {
  &-enter-from,
  &-leave-to {
    opacity: 0 !important;
    transform: translateY(-15px) !important;
  }

  &-enter-active,
  &-leave-active {
    transition-property: transform, opacity !important;
    transition-duration: 0.1s !important;
    transition-timing-function: ease-out !important;
  }
}
</style>
