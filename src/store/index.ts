import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      msg: 'hello'
    }
  }
})

export default store
