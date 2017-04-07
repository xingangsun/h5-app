/**
 * mutations
 */
export const setSidebar = (state, payload) => {
  state.sidebar = { ...state.sidebar, ...payload }
}
