<template>
  <h1> Profile component view </h1>
  <div class="card">
    <div class="card-image">
      <figure class="image is-128x128">
        <img src="https://thispersondoesnotexist.com/image" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">Sergio</p>
          <p class="subtitle is-6">Garrido Domínguez</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  setup() {
    console.log('Entra a profile');
    return {

    };
  },
};
</script>

<style scoped>

</style>
