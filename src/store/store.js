// useStore.js
import { create } from 'zustand';

const useModalStore = create((set) => ({
    isNotificationModalEnable: false,
    notificationModalData: null,

    // Action with a parameter
    updateModalData: (value, data) => set((state) => ({ isNotificationModalEnable: value, notificationModalData: data })),
}));

export default useModalStore;
