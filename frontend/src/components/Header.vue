<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1">
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="/dashboard"> Dashboard </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Users</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Settings</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid> </CContainer>
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
