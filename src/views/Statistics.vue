<template>
  <div class="wrapper">
    <aside id="main-sidebar" class="aside">
      <nav class="menu active-menu--home">
        <p class="menu-label">General</p>
        <ul class="menu-list">
          <li>
            <a class="is-active" href="/bulma-admin-dashboard-template/">
              <span class="icon is-small"><i class="fa fa-tachometer"></i></span>
              <span class="menu-text">Dashboard</span>
            </a>
          </li>
        </ul>
        <p class="menu-label">Administration</p>
        <ul class="menu-list">
          <li>
            <a class="" href="/bulma-admin-dashboard-template/forms/">
              <span class="icon is-small"><i class="fa fa-pencil-square-o"></i></span>
              <span class="menu-text">Forms</span>
            </a>
          </li>
          <li>
            <a class="" href="/bulma-admin-dashboard-template/ui-elements/">
              <span class="icon is-small"><i class="fa fa-desktop"></i></span>
              <span class="menu-text">UI Elements</span>
            </a>
          </li>
          <li>
            <a class="" href="/bulma-admin-dashboard-template/tables/">
              <span class="icon is-small"><i class="fa fa-table"></i></span>
              <span class="menu-text">Tables</span>
            </a>
          </li>
          <li>
            <a class="" href="/bulma-admin-dashboard-template/presentations/">
              <span class="icon is-small"><i class="fa fa-bar-chart"></i></span>
              <span class="menu-text">Presentations</span>
            </a>
          </li>
          <li><a class=""><span class="icon is-small"><i
            class="fa fa-cog"></i></span>
            <span class="menu-text">Layouts</span></a>
            <!-- Esta clase hace que se añada la línea gris a la izquierda. Debería ser un botón con 3 campos desplegables-->
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
        </ul>
        <p class="menu-label">Live On</p>
        <ul class="menu-list">
          <li><a class="" href="/bulma-admin-dashboard-template/additional/"><span
            class="icon is-small"><i class="fa fa-bug"></i></span> <span class="menu-text">Additional Pages</span></a>
          </li>
          <li><a class="" href="/bulma-admin-dashboard-template/extras/"><span
            class="icon is-small"><i class="fa fa-windows"></i></span> <span class="menu-text">Extras</span></a>
          </li>
        </ul>
        <div class="ads-square"></div>
      </nav>
      <div id="sidebar-toggler"><span class="icon is-small"><i
        class="fa fa-angle-double-left"></i></span>
      </div>
    </aside>
    <main class="main" id="main">
      <div class="columns is-multiline">
        <div class="column">
          <div class="box notification is-primary">
            <div class="heading">Top Seller Total</div>
            <div class="title">56,950</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Sales $</div>
                  <div class="title is-5">250K</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Overall $</div>
                  <div class="title is-5">750K</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Sales %</div>
                  <div class="title is-5">25%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box notification is-warning">
            <div class="heading">Revenue / Expenses</div>
            <div class="title">55% / 45%</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Rev Prod $</div>
                  <div class="title is-5">30%</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Rev Serv $</div>
                  <div class="title is-5">25%</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Exp %</div>
                  <div class="title is-5">45%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box notification is-info">
            <div class="heading">Feedback Activity</div>
            <div class="title">78% &uarr;</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Pos</div>
                  <div class="title is-5">1560</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Neg</div>
                  <div class="title is-5">368</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Pos/Neg %</div>
                  <div class="title is-5">77% / 23%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box notification is-danger">
            <div class="heading">Orders / Returns</div>
            <div class="title">75% / 25%</div>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading">Orders $</div>
                  <div class="title is-5">425K</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Returns $</div>
                  <div class="title is-5">106K</div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading">Success %</div>
                  <div class="title is-5">+ 28,5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <article class="message is-dark">
            <div class="message-header">
              <p>Chart</p>
            </div>
            <div class="message-body">
              <div id="chartLine" style="width: 100%"></div>
            </div>
          </article>
        </div>
        <div class="column is-6">
          <article class="message is-dark">
            <div class="message-header">
              <p>Chart</p>
            </div>
            <div class="message-body">
              <div id="chartScatter" style="width: 100%"></div>
            </div>
          </article>
        </div>
        <div class="column is-6">
          <article class="message is-dark">
            <div class="message-header">
              <p>Chart</p>
            </div>
            <div class="message-body">
              <div id="chartDoughnut" style="width: 100%"></div>
            </div>
          </article>
        </div>
        <div class="column is-6">
          <article class="message is-dark">
            <div class="message-header">
              <p>Chart</p>
            </div>
            <div class="message-body">
              <div id="chartBar" style="width: 100%"></div>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AreaChartCard from '@/components/statistics/AreaChartCard.vue';
import Doughnut from '@/components/statistics/Doughnut.vue';
import HeatMapComponent from '@/components/statistics/HeatMapComponent.vue';
import axios from 'axios';
import { BASE_URL } from '@/api/BASE_URL';
import Cookie from 'js-cookie';

export default {
  name: 'Statistics',
  components: {
    AreaChartCard,
    Doughnut,
    HeatMapComponent,
  },
  data() {
    return {
      isMobile: false,
      isLoaded: false,
      solicitudesPorEstado: {
        aceptadas: 0,
        rechazadas: 0,
        canceladas: 0,
        pendientes: 0,
      },
      ratioSolicitudes: 0.0,
      solicitudesDate: [],
      token: Cookie.get('token'),
    };
  },
  methods: {
    /* eslint-disable */
    fluctuacion() {
      axios.get(`${BASE_URL}estadisticas/fluctuacion`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          let estados = res.data.object;
          this.solicitudesPorEstado = {
            aceptadas: estados[0],
            rechazadas: estados[1],
            pendientes: estados[2],
            canceladas: estados[3],
          };
          this.isLoaded = true;
        });
    },
    solicitudesDateMethod() {
      axios.get(`${BASE_URL}estadisticas/solicitudes-fecha`, { // TOOD: Adaptar por meses
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })
        .then((res) => {
          this.solicitudesDate = res.data.object;
          console.log(res.data.object);
        });
    }
  },
  mounted() {
    this.fluctuacion();
    this.solicitudesDateMethod();
  },
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

.main {
  display: block;
  padding: 70px 1em 2em 260px;
  min-height: calc(100vh - 64px);
  transition: 0.2s all ease-out;
  border-left: none;
}
</style>
