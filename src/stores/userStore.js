// stores/userStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const userStore = (set) => ({
    user: null,
    setUser: (user) => set({ user }),
});

const useUserStore = create(
    devtools(
        (set) => ({
            ...userStore(set),
            initialize: () => {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    set({ user: JSON.parse(storedUser) });
                }
            },
            setUser: (user) => {
                set({ user });
                localStorage.setItem('user', JSON.stringify(user));
            },
        })
    )
);

export default useUserStore;