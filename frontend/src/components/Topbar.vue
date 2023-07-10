<template>
  <nav
    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <button
      id="sidebarToggleTop"
      class="btn btn-link d-md-none rounded-circle mr-3"
    >
      <i class="fa fa-bars"></i>
    </button>
    <h1 id="config_topic" class="h3 text-gray-800 ">Config Modifier</h1>
  </nav>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      config_topic: "Config Modifier",
    };
  },
};
</script>

<style></style>
