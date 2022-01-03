const getters = {
  cartList(state) {
    return state.cartList;
  },
  cartCount(state, getters) {
    return getters.cartList.length;
  },
};

export default getters;

// export default {
//   cartList(state) {
//     return state.cartList;
//   },
//   cartListLength(state) {
//     return state.cartList.length;
//   },
// };
