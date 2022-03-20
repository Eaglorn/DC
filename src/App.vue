<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const $router = useRouter();

    $router.push("login");
  },
});
</script>
