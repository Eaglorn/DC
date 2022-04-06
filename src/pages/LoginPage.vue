<template>
  <q-page padding class="flex justify-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 300px">
        <div>
          <q-input
            class="form-input shadow-1"
            filled
            outlined
            v-model="formCabal"
            label="Ссылка"
          />
          <q-input
            class="form-input shadow-1"
            filled
            outlined
            v-model="formLogin"
            label="ФИО"
          />
          <q-btn
            style="width: 300px"
            class="form-input"
            color="primary"
            label="Войти"
          />
        </div>
        <div class="items-end">
          <q-input
            class="form-input shadow-1"
            filled
            outlined
            v-model="formLogin"
            label="ФИО"
          />
          <q-btn
            style="width: 300px"
            color="primary"
            label="Создать"
            @click="createFirstCabal()"
          />
          <Vue3Lottie :animationData="lottieFirst" :height="200" :width="200" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.form-input
  margin-top: 10px
  margin-bottom: 10px
</style>

<script>
import { useCabalStore } from "stores/cabal";
import { ref } from "vue";

import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
const lottieFirst = require("../assets/lotties/first.json");

export default {
  name: "LoginName",
  components: {
    Vue3Lottie,
  },
  setup() {
    const $cabalStore = useCabalStore();

    const formCabal = ref("");
    const formLogin = ref("");

    const createFirstCabal = async function () {
      const newFirstCabalKey = await window.apiCabal
        .createFirstCabal(formLogin.value)
        .then((result) => {
          return result;
        });
    };

    return {
      formCabal,
      formLogin,
      createFirstCabal,
      lottieFirst,
    };
  },
};
</script>
