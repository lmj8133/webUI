<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand>
      <a href="https://www.algoltek.com.tw/">
        <CImage src="/assets/favicon.ico" width="35" height="35"> </CImage>
      </a>
    </CSidebarBrand>
    <CSidebarNav>
      <li class="nav-title">Nav Title</li>
      <!-- <CNavItem href="#"> Nav item </CNavItem>
      <CNavItem href="#">
        With badge
        <CBadge color="primary ms-auto">NEW</CBadge>
      </CNavItem>
      <CNavGroup>
        <template #togglerContent> </template>
        <CNavItem href="#"> item </CNavItem>
        <CNavItem href="#"> item </CNavItem>
      </CNavGroup> -->
    </CSidebarNav>
    <CButton color="danger mb-0" size="sm" @click="shutdown()">Exit</CButton>
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    />
  </CSidebar>
</template>

<script>
import {
  CSidebar,
  CSidebarBrand,
  CSidebarToggler,
  CSidebarNav,
  CNavGroup,
  CNavItem,
  CBadge,
  CImage,
  CButton,
} from "@coreui/vue";
import { CIcon } from "@coreui/icons-vue";

import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  components: {
    CSidebar,
    CSidebarBrand,
    CSidebarToggler,
    CNavGroup,
    CSidebarNav,
    CNavItem,
    CBadge,
    CImage,
    CButton,
  },
  name: "Sidebar",
  setup() {
    const store = useStore();
    return {
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    };
  },
  methods: {
    shutdown() {
      if (!confirm("Are you sure to exit?")) return;
      axios.get("/shutdown").then((response) => {
        if (response.data.status != "success") {
          console.log("shutdown failed");
        } else {
          console.log("shutdown");
          window.href = "about:blank";
          window.close();
        }
      });
    },
  },
};
</script>

<style scoped>
a {
  background-color: initial;
}
</style>
