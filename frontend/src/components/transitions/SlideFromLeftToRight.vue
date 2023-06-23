<template>
  <transition name="slide-from-left-to-right">
    <slot />
  </transition>
</template>

<style lang="scss">
.slide-from-left-to-right {
  &-enter-from,
  &-leave-to {
    opacity: 0 !important;
  }

  &-enter-from {
    transform: translateX(-100px) !important;
  }

  &-leave-to {
    transform: translateX(300px) !important;
  }

  &-enter-active {
    transition-property: transform, opacity !important;
    transition-duration: 0.1s !important;
    transition-timing-function: ease-out !important;
  }
  &-leave-active {
    transition-property: transform, opacity !important;
    transition-duration: 0.1s !important;
    transition-timing-function: ease-out !important;
  }
}
</style>
