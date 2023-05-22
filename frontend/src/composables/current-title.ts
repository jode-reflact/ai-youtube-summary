import { type ComputedRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

export const useCurrentTitle = () => {
  const { t } = useI18n();
  const currentRoute: ComputedRef<RouteLocationNormalizedLoaded> = computed(() => useRoute());

  const currentTitle: ComputedRef<string> = computed(() =>
    t(`layout.titles.${String(currentRoute.value.name)}`)
  );

  return { currentTitle };
};
