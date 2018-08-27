
const Home = {
  namespaced: true,
  state: {
    testValue: 'default'
  },
  mutations: {
    change(state: any) {
      state.testValue = 'change'
    }
  },
  actions: {

  }
}
export default Home
