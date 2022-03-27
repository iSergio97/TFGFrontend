<template>
  <div class="wrapper">
    <VerticalNav/>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <p> Estamos en habitantes </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VerticalNav from '@/components/statistics/VerticalNav';

export default {
  name: 'AdministratorHabitantes',
  components: { VerticalNav },
  data() {

  },
};
</script>

<style scoped>
* {
  text-align: center;
}

.main {
  display: block;
  padding: 70px 1em 2em 260px;
  min-height: calc(100vh - 64px);
  transition: 0.2s all ease-out;
  border-left: none;
}
</style>
