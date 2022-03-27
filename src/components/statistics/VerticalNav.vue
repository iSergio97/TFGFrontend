<template>
  <aside id="main-sidebar" class="aside">
    <nav class="menu active-menu--home">
      <p class="menu-label">Ir a..</p>
      <ul class="menu-list">
        <li>
          <router-link to="habitantes">
            <span class="icon is-small"><i class="fa-solid fa-address-card"></i></span>
            <span class="menu-text">Habitantes</span>
          </router-link>
        </li>
        <li>
          <router-link class="" to="operaciones">
            <span class="icon is-small"><i class="fa fa-desktop"></i></span>
            <span class="menu-text">Operaciones</span>
          </router-link>
        </li>
        <li>
          <router-link class="" to="solicitudes">
            <span class="icon is-small"><i class="fa-solid fa-address-card"></i></span>
            <span class="menu-text">Solicitudes</span>
          </router-link>
        </li>
        <li>
          <router-link class="" to="heatmap">
            <span class="icon is-small"><i class="fa fa-map"></i></span>
            <span class="menu-text">Mapa de calor</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'VerticalNav'
};
</script>

<style scoped>
* {
  text-align: center;
}

.aside {
  padding: 2em .5em 0 .5em;
  overflow: hidden;
  transition: 0.2s width ease-out;
  position: fixed;
  top: 64px;
  left: 0;
  z-index: 2;
  width: 250px;
  border-left: none;
}

</style>
