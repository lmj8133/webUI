import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    uploadFormID: "upload_form_id",
    headerData: undefined,
    headerFile: '',
    headerFileChanged: false,
    isConfirm: false,
    dataIndex: {},
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    updateHeaderData(state, payload) {
      state.headerData = payload.data
    },
    updateHeaderFile(state, payload) {
      state.headerFile = payload.file
    },
    updateHeaderFileChanged(state) {
      state.headerFileChanged = !state.headerFileChanged
    },
    updateIsConfirm(state, payload) {
      state.isConfirm = payload.value
    },
    updateDataIndex(state, payload) {
      state.dataIndex = payload.index
    },
    updateIsShutDown(state, payload) {
      state.isShutDown = payload.value
    }
  },
  actions: {
    updateHeaderData(context, data) {
      context.commit('updateHeaderData', { data: data })
    },
    updateHeaderFile(context, file) {
      context.commit('updateHeaderFile', { file: file })
    },
    updateHeaderFileChanged(context) {
      context.commit('updateHeaderFileChanged')
    },
    confirm(context, value = true) {
      context.commit('updateIsConfirm', { value: value })
    },
    updateDataIndex(context, index) {
      context.commit('updateDataIndex', { index: index })
    },
    updateIsShutDown(context, value = true) {
      context.commit('updateIsShutDown', { value: value })
    }
  },
  modules: {},
})
