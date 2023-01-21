<template>
  <div>
    <div class="row">
      <NavBar />
    </div>
    
    <div class="row">
      <router-view></router-view>
      <!-- <LotteryAddView /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LotteryBrowseView from "./views/lottery/LotteryBrowseView.vue";
import NavBar from "./components/NavBar.vue";
import LotteryAddView from "./views/lottery/LotteryAddView.vue";

export default defineComponent({
  name: "App",
  components: {
    LotteryBrowseView,
    LotteryAddView,
    NavBar,
  },
});
</script>

<style scoped>
</style>
