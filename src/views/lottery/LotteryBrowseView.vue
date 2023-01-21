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
            <h5 class="card-title">Resultado</h5>

            <div class="form-floating mb-3 mt-4">
              <input
                type="text"
                class="form-control"
                v-model="ticket"
                placeholder="Nome"
              />
              <label>Ticket</label>
            </div>

            <div class="d-grid gap-2 mt-4">
              <button
                class="btn btn-secondary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#resultModal"
                v-on:click="search()"
              >
                Buscar
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
          
          <div v-if="isSuccess">
            <p><span class="fw-bold">Status:</span> {{ message }}</p>
            <p><span class="fw-bold">Números Sorteados:</span> {{ machineNumbers }}</p>
            <p><span class="fw-bold">Seus Números:</span> {{ yourNumbers }}</p>
            <p><span class="fw-bold">Ganhador:</span> {{ winner }}</p>
          </div>
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
      ticket: "",
      titleModal: "Resultado",
      textModal: "",
      isSuccess: false,
      successModal: "bi bi-check-circle text-success",
      errorModal: "bi bi-x-circle text-danger",
      message: "",
      machineNumbers: "",
      yourNumbers: "",
      winner: "",
    };
  },
  methods: {
    search() {
      this.titleModal = "Resultado";
      this.isSuccess = false;

      if (!this.ticket.trim()) {
        this.textModal = "Necessário fornecer o ticket";
        return false;
      }

      axios
        .get(`http://localhost/api/ticket?ticketCode=${this.ticket}`)
        .then((response) => {
          if (response.data.error) {
            this.textModal = response.data.message;
            return false;
          }

          this.isSuccess = true;
          this.textModal = "";
          this.message = response.data.message;
          this.machineNumbers = response.data.machineNumbers;
          this.yourNumbers = response.data.yourNumbers;
          this.winner = response.data.winner;
          
          return true;
        })
        .catch((error) => {
          this.textModal = error.response.data.message;
        });
    },
  },
});
</script>
  
    