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
      <!-- <CImage src="/assets/favicon.ico" width="30" height="30" />
      Algoltek -->
      <CIcon :icon="logoNegative" :height="35" />
      <CIcon :icon="sygnet" :height="35" />
    </CSidebarBrand>
    <CSidebarNav>
      <li class="nav-title">Nav Title</li>
      <CNavItem href="#"> Nav item </CNavItem>
      <CNavItem href="#">
        With badge
        <CBadge color="primary ms-auto">NEW</CBadge>
      </CNavItem>
      <CNavGroup>
        <template #togglerContent> </template>
        <CNavItem href="#"> item </CNavItem>
        <CNavItem href="#"> item </CNavItem>
      </CNavGroup>
    </CSidebarNav>
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
} from "@coreui/vue";
import { CIcon } from "@coreui/icons-vue";
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'

import { computed } from "vue";
import { useStore } from "vuex";

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
    CIcon,
  },
  name: "Sidebar",
  setup() {
    const store = useStore();
    return {
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
      logoNegative,
      sygnet,
    };
  },
};
</script>
