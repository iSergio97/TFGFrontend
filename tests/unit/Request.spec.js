// https://v1.test-utils.vuejs.org/guides/common-tips.html

/* eslint-disable */
import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import RequestFormComponent from "../../src/components/request/RequestFormComponent";
import UserFormComponent from "../../src/components/request/UserFormComponent";

let wrapper;

let datos = {
  opcion: "A",
  subOpcion: "ACR",
  tipoVivienda: ["Calle"],
  vivienda: "",
  numeracion: "",
  nombre: "Sergio",
  primerApellido: "Garrido",
  segundoApellido: "Domínguez",
  fechaNacimiento: "1974-11-26",
  tIdentificacion: "17476937L",
};

let userLogged = {
  fechaNacimiento: "1974-11-26",
  nombre: "Juan",
  numeracion: {
    id: 891,
    calle: {
      id: 451,
      municipio: {
        id: 3,
        provincia: {
          id: 2,
          nombre: "Sevilla",
          pais: {
            id: 1,
            nombre: "ESPAÑA",
          },
        },
        nombre: "ECIJA",
      },
      nombre: "Abeto",
      tipo: "Calle",
    },
    escalera: 1,
    lat: 37.545139,
    lng: -5.088068,
    numero: 1,
    planta: 0,
    puerta: "01",
    referenciaCatastral: "0DB7AF92607C4D79A771",
  },
  opcion: "A",
  primerApellido: "Pérez",
  segundoApellido: "Gómez",
  subOpcion: "ACR",
  tIdentificacion: "12345678K",
  tipoVivienda: "Calle",
  vivienda: {
    id: 451,
    municipio: {
      id: 3,
      provincia: {
        id: 2,
        nombre: "Sevilla",
        pais: {
          id: 1,
          nombre: "ESPAÑA",
        },
      },
      nombre: "ECIJA",
    },
    nombre: "Abeto",
    tipo: "Calle",
  },
};

describe("RequestFormComponent.vue", () => {
  beforeEach(() => {
    wrapper = mount(RequestFormComponent, {
      propsData: {
        userLogged: userLogged,
      },
    });
  });

  it("El botón de tipo de solicitud actualiza el valor del campo de subtipo de solicitud", () => {
    //global.localStorage = window.localStorage
    let position = 0;

    /*
    Cargamos los props y vemos que los datos llegan correctos
     */

    expect(wrapper.props().userLogged.vivienda.id).to.eq(451);

    console.log(wrapper);
    // expect(wrapper.props().datos.fechaNacimiento).not.to.empty;

    // expect(wrapper.props().position).to.eq(0);

    const userFormComponentWrapper = wrapper.findComponent(UserFormComponent);

    userFormComponentWrapper.propsData = {
      userLogged: userLogged,
      datos: datos,
      position: 0,
    };

    /*userFormComponentWrapper.setProps({
      userLogged: userLogged,
      datos: datos,
      position: position,
    });*/

    console.log("userFormComponentWrapper", userFormComponentWrapper);

    expect(userFormComponentWrapper.exists()).to.eq(true);
  });
});
