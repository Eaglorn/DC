<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useCabalStore } from "stores/cabal";

export default defineComponent({
  name: "App",
  setup() {
    const $cabalStore = useCabalStore();
    const $router = useRouter();

    $router.push("/login");
  },
});
</script>
