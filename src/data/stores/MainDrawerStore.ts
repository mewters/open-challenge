import { createStore } from '@udecode/zustood';

export const MainDrawerStore = createStore('MainDrawer')({
    isOpen: false,
}).extendActions((set, get) => ({
    toggle: () => set.isOpen(!get.isOpen()),
}));
