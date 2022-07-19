<template>
  <div id="notfound" :style="isMobile ? innerWidth : ''">
    <div class="notfound">
      <div class="notfound-404">
        <div></div>
        <h1>404</h1>
      </div>
      <h2>Página no encontrada</h2>
      <p>La página a la que intentas acceder no está disponible. Es posible que se haya eliminado o
        no esté disonible temporalmente. Inténtelo de nuevo más tarde</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'RouterError',
  setup() {
    const errorMessage = ref();
    // const session = localStorage.getItem('');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return {
      errorMessage,
      isMobile,
    };
  },
};
</script>
<style scoped>
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 920px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
}

.notfound .notfound-404 {
  position: absolute;
  height: 100px;
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: -1;
}

.notfound .notfound-404 h1 {
  font-family: 'Maven Pro', sans-serif;
  color: #cccccc;
  font-weight: 900;
  font-size: 276px;
  margin: 0px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound h2 {
  font-family: 'Maven Pro', sans-serif;
  font-size: 46px;
  color: #000;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0px;
}

.notfound p {
  font-family: 'Maven Pro', sans-serif;
  font-size: 16px;
  color: #000;
  font-weight: 400;
  text-transform: uppercase;
  margin-top: 15px;
}

.notfound a {
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
  background: #189cf0;
  display: inline-block;
  padding: 16px 38px;
  border: 2px solid transparent;
  border-radius: 40px;
  color: #fff;
  font-weight: 400;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.notfound a:hover {
  background-color: #fff;
  border-color: #189cf0;
  color: #189cf0;
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 h1 {
    font-size: 162px;
  }

  .notfound h2 {
    font-size: 26px;
  }
}

</style>
