import { boot } from "quasar/wrappers";
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(Vue3Lottie);
});
