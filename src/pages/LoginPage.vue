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
          <q-btn style="width: 300px" color="primary" label="Создать" />
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import { LocalStorage } from "quasar";

export default {
  name: "LoginName",
  setup() {
    const $cabalStore = useCabalStore();
    const $router = useRouter();

    const cabal = window.electronCabal.cabal;

    //console.log(LocalStorage.getItem("fio"));
    //LocalStorage.set("fio", "AAA");
    //console.log(LocalStorage.getItem("fio"));

    //state.items.push({ name: 'shoes', quantity: 1 })
    //state.hasChanged = true

    const formCabal = ref("");
    const formLogin = ref("");

    return {
      formCabal,
      formLogin,
    };
  },
};
</script>
