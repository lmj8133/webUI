<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
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
      <CButton color="success" type="summit" @click="confirm()" >Confirm</CButton>
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
  CButton
} from "@coreui/vue";
import { CIcon } from "@coreui/icons-vue";
import { cilHamburgerMenu } from "@coreui/icons";
import { useStore } from "vuex";

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
    CButton
},
  name: "Topbar",
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    return {
      cilHamburgerMenu,
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("confirm");
    },
  }
};
</script>

<style></style>
