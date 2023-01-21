<template>
  <!-- <div class="position-absolute w-100 h-100 body-login"> -->
  <div class="body-login">
    <div class="container">
      <div class="position-absolute top-50 start-50 translate-middle w-25 h-75">
        <div class="text-center">
          <img src="@/img/logos/logo.png" class="w-100" />
        </div>

        <div class="card text-center w-100 mt-5 shadow">
          <div class="card-body mt-1">
            <h5 class="card-title">Cadastrar</h5>

            <div class="form-floating mb-3 mt-4">
              <input
                type="text"
                class="form-control"
                v-model="name"
                placeholder="Nome"
              />
              <label>Nome</label>
            </div>

            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                v-model="numbers"
                placeholder="Numbers"
              />
              <label>Números (ex: 1,2,3...)</label>
            </div>

            <div class="d-grid gap-2 mt-4">
              <button
                class="btn btn-secondary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#resultModal"
                v-on:click="add()"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="resultModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg text-center">
      <div class="modal-content p-4">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <i v-bind:class="[isSuccess ? successModal : errorModal]"></i>
            {{ titleModal }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="textModal">
          {{ textModal }}
            <button v-if="isSuccess" class="btn btn-sm float-end" v-bind:class="[isCopied ? 'btn-success' : 'btn-primary']" v-on:click="copyText()" type="button">{{ isCopied ? 'Copiado' : 'Copiar' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LotteryAddView",
  data() {
    return {
      name: "",
      numbers: "",
      arrayNumbers: "",
      titleModal: "",
      textModal: "",
      ticket: "",
      isSuccess: true,
      isCopied: false,
      successModal: "bi bi-check-circle text-success",
      errorModal: "bi bi-x-circle text-danger",
    };
  },
  methods: {
    copyText() {
      let text = this.ticket;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.isCopied = true;
        })
    },

    validate() {
      this.titleModal = "Validação";
      this.isSuccess = false;

      if (!this.name.trim()) {
        this.textModal = "Nome inválido";
        return false;
      }

      if (!this.numbers.trim()) {
        this.textModal = "Números inválidos";
        return false;
      }

      this.arrayNumbers = this.numbers.split(",");
      if (this.arrayNumbers.length != 6) {
        this.textModal =
          "Necessário fornecer 6 números inteiros separados por vírgula\nEx: 1,2,3,4,5,6";
        return false;
      }

      this.arrayNumbers.forEach((element) => {
        if (!Number.isInteger(parseFloat(element))) {
          this.textModal = `Número ${element} inválido`;
          return false;
        }
      });

      return true;
    },

    add() {
      if (!this.validate()) {
        return false;
      }
      this.titleModal = "Cadastro";

      axios
        .post("http://localhost/api/create-ticket", {
          name: this.name,
          numbers: this.arrayNumbers,
        })
        .then((response) => {
          if (response.data.error) {
            this.textModal = response.data.message;
            return false;
          }

          this.isSuccess = true;
          this.isCopied = false;
          this.ticket = response.data.ticketCode;
          this.textModal = `Ticket: ${this.ticket}`;

          return true;
        })
        .catch((error) => {
          this.textModal = error.response.data.message;
        });
    },
  },
});
</script>
  
    