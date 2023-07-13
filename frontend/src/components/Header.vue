<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderBrand class="mx-auto d-lg-none" to="#">Config Modifier</CHeaderBrand>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
      </CHeaderToggler>
    </CContainer>
  </CHeader>
</template>

<script>
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  CHeaderDivider,
  CContainer,
} from "@coreui/vue";
export default {
  components: {
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CHeaderToggler,
    CNavItem,
    CNavLink,
    CHeaderDivider,
    CContainer,
  },
  name: "Topbar",
  data() {
    return {};
  },
};
</script>

<style></style>
