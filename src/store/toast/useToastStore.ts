import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  duration?: number; // 자동 사라짐 시간 (ms)
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, duration = 3000) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message, duration }] }));
    // duration 후 자동 제거
    setTimeout(() => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })), duration);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}));