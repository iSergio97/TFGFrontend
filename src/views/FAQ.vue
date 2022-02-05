<template>
  <main>
    <h1 class="faq-heading title">Preguntas frecuentes</h1>
    <section class="faq-container">
      <div class="faq">
        <h1 class="faq-page subtitle is-4">¿Qué es el PMOH?</h1>
        <div class="faq-body">
          <p>El PMOH o Padrón Municipal Online de Habitantes es el lugar donde puedes realizar las
            gestiones del ayuntamiento, desde tu casa.
          </p>
        </div>
      </div>
      <hr class="hr-line">

      <div class="faq">

        <!-- faq question -->
        <h1 class="faq-page faq-page subtitle is-4">¿Qué puedo hacer en este sitio?</h1>

        <!-- faq answer -->

        <div class="faq-body">
          Entre las opciones disponibles están las operaciones de modificación o confirmación de
          residencia:
          <ul>
            <li>
              <p> * Modificación de datos personales </p>
            </li>
            <li>
              <p>
                * Modificación de domicilio (reempadronamiento en otro domicilio), solo o acompañado
                por quien tú decidas.
              </p>
            </li>
            <li>
              <p>
                * Confirmación de residencia para habitantes con tarjeta de extranjería.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <hr class="hr-line">


      <div class="faq">

        <!-- faq question -->
        <h1 class="faq-page faq-page subtitle is-4">¿Qué ventajas tiene sobre hacerlas en el propio
          ayuntamiento?</h1>

        <!-- faq answer -->
        <div class="faq-body">
          <p>
            La mayor ventaja puede ser el tiempo de espera para realizar la solicitud.
            No necesitas pedir cita, esperar una cola para que llegue tu turno, presentar la
            solicitud y que te comentne que te faltan documentos por aportar y te la rechacen.
            Aquí inicias sesión, realizas la solicitud y esperas respuesta. Si te la cancela,
            vuelves a realizar el proceso en segundos aportando lo que pone en el comentario de la
            solicitud rechadaza. En cambio, si te la aceptan, ya está todo hecho, el ayuntamiento
            actualizará tus datos a prinicpios del mes siguiente (se recomienda no realizar
            operaciones en el ayuntamiento tras realizar una solicitud, pues se darán prioridad a
            los datos del ayuntamiento).
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'FAQ',
  setup() {

  },
  mounted() {
    const faq = document.getElementsByClassName('faq-page');
    let i;
    for (i = 0; i < faq.length; i++) {
      faq[i].addEventListener('click', function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle('active');
        /* Toggle between hiding and showing the active panel */
        const body = this.nextElementSibling;
        if (body.style.display === 'block') {
          body.style.display = 'none';
        } else {
          body.style.display = 'block';
        }
      });
    }
  }
};
</script>

<style scoped>
body {
  height: auto;
}

html,
body {
  font-family: "Open Sans", "Roboto", "Segoe UI", "GeezaPro", "DejaVu Serif", "sans-serif", "-apple-system", "BlinkMacSystemFont";
  overflow-y: auto !important;
  height: 100%;
}

.faq-heading {
  border-bottom: #777;
  padding: 20px 60px;
  text-align: center;
}

.faq-container {
  display: flex;
  justify-content: center;
  flex-direction: column;

}

.hr-line {
  width: 60%;
  margin: auto;

}

/* Style the buttons that are used to open and close the faq-page body */
.faq-page {
  /* background-color: #eee; */
  color: #444;
  cursor: pointer;
  padding: 30px 20px;
  width: 60%;
  border: none;
  outline: none;
  transition: 0.4s;
  margin: auto;
}

.faq-body {
  margin: auto;
  /* text-align: center; */
  width: 50%;
  background-color: transparent;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active,
.faq-page:hover {
  background-color: #F9F9F9;
}

/* Style the faq-page panel. Note: hidden by default */
.faq-body {
  padding: 0 18px;
  background-color: #ececec;
  display: none;
  overflow: hidden;
}

.faq-page:after {
  content: '\25BC';
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\25B2";
}
</style>
