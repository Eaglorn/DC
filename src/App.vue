<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useCabalStore } from "stores/cabal";

const cabal = window.electronCabal.cabal;

export default defineComponent({
  name: "App",
  setup() {
    const $cabalStore = useCabalStore();
    const $router = useRouter();

    console.log(cabal);
    if (cabal.cabals.size == 0) {
      $router.push("/login");
    } else {
      $router.push("/main");
    }

    //state.items.push({ name: 'shoes', quantity: 1 })
    //state.hasChanged = true
  },
});
</script>
