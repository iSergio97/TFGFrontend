import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home";

describe("Home.vue", () => {
  it("La página inicial tiene título, subtítulo, botón de preguntas frecuentes e imagen", () => {
    const wrapper = shallowMount(Home);
    const img = wrapper.findAll("img");
    expect(wrapper.text()).to.includes("Padrón Municipal Online de Habitantes");
    expect(wrapper.text()).to.includes(
      "Tus gestiones en el ayuntamiento, desde tu dispositivo móvil"
    );
    expect(wrapper.text()).to.includes("Pregunas frecuentes");
    expect(img.length).to.eq(1);
  });
});
