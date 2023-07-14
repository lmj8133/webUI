import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    uploadFormID: "upload_form_id",
    headerData: [
      {
        id: "board_define",
        title: "#define BOARD_NO",
        widget_type: "dropdown",
        dependency: "",
        result: {
          id: "board_result",
          default_text: "Select Board",
        },
        content: [
          {
            id: "board4",
            value: "BOARD4",
            type_board: "DB",
            type_ic: "AG9421",
            note: "88 pin demo board(AG9421)",
          },
          {
            id: "board5",
            value: "BOARD5",
            type_board: "EVB",
            type_ic: "AG9410",
            note: "48 pin EVB(AG9410)",
          },
          {
            id: "board7",
            value: "BOARD7",
            type_board: "Customer",
            type_ic: "AG9411",
            note: "PX(AG9411)",
          },
          {
            id: "board8",
            value: "BOARD8",
            type_board: "Customer",
            type_ic: "AG9421",
            note: "Fullink, 88 pin(AG9421)",
          },
          {
            id: "board9",
            value: "BOARD9",
            type_board: "Customer",
            type_ic: "AG9421",
            note: "Kingtron(AG9421)",
          },
          {
            id: "board11",
            value: "BOARD11",
            type_board: "DB",
            type_ic: "AG9410",
            note: "64 pin demo board with single type-c port(AG9410)",
          },
          {
            id: "board12",
            value: "BOARD12",
            type_board: "DB",
            type_ic: "AG9411",
            note: "64 pin demo board with dual type-c port(AG9411)",
          },
          {
            id: "board13",
            value: "BOARD13",
            type_board: "Customer",
            type_ic: "AG9421",
            note: "C-Smartlink, 88 pin(AG9421)",
          },
          {
            id: "board14",
            value: "BOARD14",
            type_board: "DB",
            type_ic: "AG9410",
            note: "56 pin demo board(AG9410)",
          },
          {
            id: "board21",
            value: "BOARD21",
            type_board: "FAE",
            type_ic: "AG9411P",
            note: "(AG9411P)",
          },
          {
            id: "board31",
            value: "BOARD31",
            type_board: "FAE",
            type_ic: "AG9411",
            note: "FAE reference circuit for PCB with cable plug, 2 lane(AG9411)",
          },
          {
            id: "board32",
            value: "BOARD32",
            type_board: "FAE",
            type_ic: "AG9421",
            note: "FAE reference circuit with dual type-c receptacle, 2 lane(AG9411)",
          },
        ],
      },
      {
        id: "application_types",
        title: "#define ApplicationType",
        widget_type: "dropdown",
        dependency: "",
        result: {
          id: "application_result",
          default_text: "Select Application Type",
        },
        content: [
          {
            id: "Application_Generic_2L_HBR3",
            value: "Application_Generic_2L_HBR3",
            note: "2 lane HBR3",
          },
          {
            id: "AppType_Generic_4L_HBR2",
            value: "AppType_Generic_4L_HBR2",
            note: "4 lane HBR2",
          },
        ],
      },
      {
        id: "CC_ADC",
        title: "#define CC_ADC",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Detect CC voltage with ADC",
        },
      },
      {
        id: "REVERSE_CHARGE",
        title: "#define REVERSE_CHARGE",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Transmit USB data from charger port",
        },
      },
      {
        id: "SUPPORT_NINTENDO",
        title: "#define SUPPORT_NINTENDO",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Support Nintendo Switch",
        },
      },
      {
        id: "SUPPORT_NINTENDO_SHOW_SCREEN",
        title: "#define SUPPORT_NINTENDO_SHOW_SCREEN",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Display on NS panel when moniter is not connected",
        },
      },
      {
        id: "LEGACY_SUPPORT_NINTENDO",
        title: "#define LEGACY_SUPPORT_NINTENDO",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Display Nintendo Switch with non-original charger",
        },
      },
      {
        id: "CC_ADC",
        title: "#define CC_ADC",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Detect CC voltage with ADC",
        },
      },
      {
        id: "REVERSE_CHARGE",
        title: "#define REVERSE_CHARGE",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Transmit USB data from charger port",
        },
      },
      {
        id: "SUPPORT_NINTENDO",
        title: "#define SUPPORT_NINTENDO",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Support Nintendo Switch",
        },
      },
      {
        id: "SUPPORT_NINTENDO_SHOW_SCREEN",
        title: "#define SUPPORT_NINTENDO_SHOW_SCREEN",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Display on NS panel when moniter is not connected",
        },
      },
      {
        id: "LEGACY_SUPPORT_NINTENDO",
        title: "#define LEGACY_SUPPORT_NINTENDO",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Display Nintendo Switch with non-original charger",
        },
      },
      {
        id: "CC_ADC",
        title: "#define CC_ADC",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Detect CC voltage with ADC",
        },
      },
      {
        id: "REVERSE_CHARGE",
        title: "#define REVERSE_CHARGE",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Transmit USB data from charger port",
        },
      },
      {
        id: "SUPPORT_NINTENDO",
        title: "#define SUPPORT_NINTENDO",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Support Nintendo Switch",
        },
      },
      {
        id: "SUPPORT_NINTENDO_SHOW_SCREEN",
        title: "#define SUPPORT_NINTENDO_SHOW_SCREEN",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Display on NS panel when moniter is not connected",
        },
      },
      {
        id: "LEGACY_SUPPORT_NINTENDO",
        title: "#define LEGACY_SUPPORT_NINTENDO",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Display Nintendo Switch with non-original charger",
        },
      },
      {
        id: "SUPPORT_NINTENDO_FIXED_PDO",
        title: "#define SUPPORT_NINTENDO_FIXED_PDO",
        widget_type: "checkbox",
        dependency: "SUPPORT_NINTENDO",
        content: {
          note: "Speed up Nintendo Switch display time",
        },
      },
      {
        id: "Transmit_U3_Signal",
        title: "#define Transmit_U3_Signal",
        widget_type: "checkbox",
        dependency: "",
        content: {
          note: "Transmit U3 with data line",
        },
      },
    ],
    headerFile: '',
    headerFileChanged: false,
    isConfirm: false,
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
    confirm(context) {
      context.commit('updateIsConfirm', { value: true })
    }
  },
  modules: {},
})
