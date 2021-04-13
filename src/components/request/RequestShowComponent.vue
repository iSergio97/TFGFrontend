<template>
  <br>
  <div class="columns is-centered">
    <div class="column">
      <div class="card">
        <div class="card-content">
          <div class="content">
            Tarjeta izquierda
          </div>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="card">
        <div class="card-content">
          <div class="content has-text-left">
            <strong>Solicitante:</strong> {{solicitante}}
          </div>
          <div class="content has-text-left">
            <strong>Fecha de creación:</strong> {{fechaCreacion}}
          </div>
          <div class="content">
              <div class="content has-text-left">
                <strong>Estado:</strong> Rechazada
              </div>
              <!-- TODO: Cambiar botón por estado y que se alinee a la izquierda -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RequestShowComponent',
  props: {
    id: Number,
  },
  setup(props) {
    const idRequest = ref(props.id);
    const router = useRouter();
    if (Number.isNaN(idRequest.value)) {
      router.push('/database-error');
    }
    const requests = JSON.parse(localStorage.getItem('requests'));
    /* eslint-disable */
    const request = requests.find((req) => {
      return req.id === idRequest.value;
    });
    const solicitante = computed(() => `${request.solicitante.nombre}  ${request.solicitante.primerApellido} ${request.solicitante.segundoApellido}`);
    const fecha = request.fecha;
    const fechaCreacion = computed(() => `${new Date(fecha).getDate()}/${new Date(fecha).getMonth()}/${new Date(fecha).getFullYear()}`);
    let estado;
    switch (request.estado) {
      case 'A':
        estado = 'Aceptada';
        break;
      case 'R':
        estado = 'Rechazada';
        break;
      case 'P':
        estado = 'Pendiente';
        break;
      case 'C':
        estado = 'Cancelada';
        break;
      default:
        estado = 'Estado desconocido';
        break;
    }
    console.log(fechaCreacion.value);
    /* eslint-enable */
    console.log('request', request);
    return {
      request,
      solicitante,
      fechaCreacion,
      estado,
    };
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
