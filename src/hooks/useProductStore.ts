import { create } from "zustand";

// zustand for state management
// localStorage for persisting the data from reloading

const loadFromLocalStorage = () => {
    try {
        const cartData = localStorage.getItem('cartList');
        const favData = localStorage.getItem('favList');
        return {
            cart: cartData ? new Map(JSON.parse(cartData)) : new Map(),
            fav: favData ? JSON.parse(favData) : []
        };
    } catch (e) {
        return { cart: new Map(), fav: [] };
    }
};

const saveToLocalStorage = (cartList, favList) => {
    localStorage.setItem('cartList', JSON.stringify([...cartList]));
    localStorage.setItem('favList', JSON.stringify(favList));
};


export const useProductStore = create<{
    favList: any[],
    cartList: Map<number, any>,
    isCheckoutDone: boolean,
    addToShoppingCart: (item: any) => void,
    addToFavoriteList: (item: any) => void,
    removeFromShoppingCart: (item: any) => void
    removeFromFavoriteListCart: (item: any) => void
    resetCartList: () => void
    checkout: (value: boolean) => void
}>((set) => ({
    isCheckoutDone: false,
    favList: loadFromLocalStorage().fav,
    cartList: loadFromLocalStorage().cart,
    checkout: (value) => set(() => {
        return { isCheckoutDone: value }
    }),
    resetCartList: () => set(() => {
        localStorage.removeItem("cartList")
        return { cartList: new Map() }
    }),
    addToShoppingCart: (item) => set((state) => {
        const newCartList = new Map(state.cartList);

        if (newCartList.has(item.id)) {
            const existingItem = newCartList.get(item.id);
            existingItem.quantity += 1;
            newCartList.set(item.id, existingItem);
        } else {
            newCartList.set(item.id, { ...item, quantity: 1 });
        }
        saveToLocalStorage(newCartList, state.favList);

        return { cartList: newCartList };
    }),
    removeFromShoppingCart: (item) => set((state) => {
        const newCartList = new Map(state.cartList);

        if (newCartList.has(item.id)) {
            newCartList.delete(item.id);
        }

        saveToLocalStorage(newCartList, state.favList);
        return { cartList: newCartList };
    }),
    addToFavoriteList: (item) => set((state) => {
        const extendedFavList = Array.from(
            new Map([...state.favList, item].map((item) => [item.id, item])).values()
        );
        saveToLocalStorage(state.cartList, extendedFavList);
        return { favList: extendedFavList };
    }),
    removeFromFavoriteListCart: (item) => set((state) => {
        let updatedList = state.favList

        if (state.favList.some((fav) => fav.id === item.id)) {
            updatedList = state.favList.filter((fav) => fav.id !== item.id)
        }

        saveToLocalStorage(state.cartList, updatedList);
        return { favList: updatedList };
    }),
}))