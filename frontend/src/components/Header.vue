<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <!-- <CImage src="@/assets/icon.ico" /> -->
        <CIcon :icon="cilHamburgerMenu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="#"
        >Config Modifier</CHeaderBrand
      >
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="/configheader" class="me-2">config.h</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/boardheader" class="me-2">board.h</CNavLink>
        </CNavItem>
      </CHeaderNav>
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
import { CIcon } from "@coreui/icons-vue";
import { cilHamburgerMenu } from "@coreui/icons";

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
    CIcon,
  },
  name: "Topbar",
  data() {
    return {};
  },
  setup() {
    return {
      cilHamburgerMenu,
    };
  },
};
</script>

<style></style>
