import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

interface SidebarStore {
  collapsed: Ref<boolean>;
  toggle: () => void;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const useSidebarStore = defineStore('sidebar', (): SidebarStore => {
  const localStorageCollapsed: string =
    localStorage.getItem('desktop-sidebar-collapsed') || 'False';
  const collapsed: Ref<boolean> = ref(localStorageCollapsed === 'True');
  const toggle = () => {
    collapsed.value = !collapsed.value;
    localStorage.setItem('desktop-sidebar-collapsed', collapsed.value ? 'True' : 'False');
  };

  return { collapsed, toggle };
});
