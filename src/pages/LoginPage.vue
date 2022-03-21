<template>
  <q-page padding class="flex justify-center">
    <div class="q-pa-md flex justify-center">
      <div class="q-gutter-md flex justify-center" style="width: 300px">
        <div>
          <q-input
            class="form-input"
            filled
            v-model="formCabal"
            label="Ссылка"
          />
          <q-input class="form-input" filled v-model="formLogin" label="ФИО" />
          <q-btn
            style="width: 300px"
            class="form-input"
            color="primary"
            label="Войти"
          />
        </div>
        <p>Если вам нужно создать новый</p>
        <div class="items-end">
          <q-btn
            style="width: 300px"
            color="primary"
            label="Создать"
            @click="createFirstCabal()"
          />
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

export default {
  name: "LoginName",
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
      console.log(newFirstCabalKey);
    };

    return {
      formCabal,
      formLogin,
      createFirstCabal,
    };
  },
};
</script>
