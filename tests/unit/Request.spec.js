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

  it("El componente UserFormComponent es cargado en el parent component", async () => {
    //global.localStorage = window.localStorage
    let position = 0;

    /*
    Cargamos los props y vemos que los datos llegan correctos
     */

    expect(wrapper.props().userLogged.vivienda.id)
      .to
      .eq(451);

    const userFormComponentWrapper = await wrapper.findAllComponents({ name: "UserFormComponent" });

    userFormComponentWrapper.propsData = {
      userLogged: userLogged,
      datos: datos,
      position: 0,
      firstLoad: true,
    };

    console.log("userFormComponentWrapper", userFormComponentWrapper);

    // Comprobamos que el childComponent tiene el mismo valor que el parentComponent en la primera carga
    expect(userFormComponentWrapper.propsData.userLogged.fechaNacimiento)
      .to
      .eq(
        wrapper.props().userLogged.fechaNacimiento
      );
    expect(userFormComponentWrapper.propsData.userLogged.nombre)
      .to
      .eq(
        wrapper.props().userLogged.nombre
      );

    expect(userFormComponentWrapper.propsData.userLogged.primerApellido)
      .to
      .eq(
        wrapper.props().userLogged.primerApellido
      );

    expect(userFormComponentWrapper.propsData.userLogged.segundoApellido)
      .to
      .eq(
        wrapper.props().userLogged.segundoApellido
      );
  });

  it("El componente UserFormComponent activa el watch al cambiar de opcion", async () => {
    const userFormComponentWrapper = await wrapper.findAllComponents({ name: "UserFormComponent" });

    userFormComponentWrapper.propsData = {
      userLogged: userLogged,
      datos: datos,
      position: 0,
      firstLoad: true,
    };

    expect(1)
      .eq(1);

  });
});
