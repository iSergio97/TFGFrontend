import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import RequestFormComponent from "../../src/components/request/RequestFormComponent";

describe("RequestFormComponent.vue", () => {
  it("La primera carga del componente Solicitud carga", () => {
    global.localStorage = window.localStorage;
    const wrapper = shallowMount(RequestFormComponent, {
      props: {
        userLogged: {}, //TODO: Plantear el userLogged
      },
    });
    expect(wrapper.text()).to.include(" ");
  });
});
