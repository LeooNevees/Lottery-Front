<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/add"
      ><img src="src/img/logos/logo-dark.png" style="margin-left: 2%"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/add" class="text-decoration-none">
            <a
              class="nav-link"
              v-bind:class="[isAdd ? 'text-burble' : '']"
              v-on:click="setMenu('add')"
              >Cadastrar
            </a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/search" class="text-decoration-none">
            <a
              class="nav-link"
              v-bind:class="[isSearch ? 'text-burble' : '']"
              v-on:click="setMenu('search')">Buscar
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  data() {
    return {
      isAdd: true,
      isSearch: false,
    };
  },
  methods: {
    setMenu(option: string) {
      this.isAdd = false;
      this.isSearch = true;

      if (option == "add") {
        this.isAdd = true;
        this.isSearch = false;
      }
    },
  },
});
</script>

<style scoped>
.text-burble {
  color: #502ec3 !important;
}
</style>