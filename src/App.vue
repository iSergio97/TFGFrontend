/* eslint-disable */
<template>
  <CommonNavbar/>
</template>

<script>
import CommonNavbar from './views/CommonNavbar';

export default {
  name: 'App',
  components: {
    CommonNavbar,
  },
};
</script>

<style>
html,
body {
  font-family: "Open Sans", "Roboto", "Segoe UI", "GeezaPro", "DejaVu Serif", "sans-serif", "-apple-system", "BlinkMacSystemFont";
  height: 100%;
}

img {
  padding: 5px;
  border: 1px solid #ccc;
}

html {
  background: url(./images/v996-016.jpg) no-repeat center center;
  background-size: cover;
}

.tabs > p > a {
  border: 0;
}
</style>
