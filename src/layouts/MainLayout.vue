<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <q-icon name="laptop_chromebook" />
        <div>DC</div>

        <q-space />

        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>

      <div class="q-pa-sm q-pl-md row items-center">
        <div class="cursor-pointer non-selectable">
          Файл
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Открыть</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Создать</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable>
                <q-item-section>Настройки</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item dense clickable>
                      <q-item-section>Создать</q-item-section>
                      <q-item-section side> </q-item-section>
                    </q-item>
                    <q-item dense clickable>
                      <q-item-section>Сохранить</q-item-section>
                      <q-item-section side> </q-item-section>
                    </q-item>
                    <q-item dense clickable>
                      <q-item-section>Загрузить</q-item-section>
                      <q-item-section side> </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="closeApp">
                <q-item-section>Выйти</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <div class="q-ml-md cursor-pointer non-selectable">
          Edit
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Вырезать</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Скопировать</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Вставить</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Выделить всё</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </q-header>

    <q-page-container elevated>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    function minimize() {
      if (process.env.MODE === "electron") {
        window.apiWindow.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === "electron") {
        window.apiWindow.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === "electron") {
        window.apiWindow.close();
      }
    }

    return {
      minimize,
      toggleMaximize,
      closeApp,
    };
  },
});
</script>
