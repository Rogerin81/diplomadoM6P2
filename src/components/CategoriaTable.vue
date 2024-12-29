<template>
  <div>
    <h3 class="text-center">Lista</h3>
    <div class="table-container">
      <table class="table table-striped table-bordered table-striped">
        <thead>
          <tr class="table-success text-center">
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>{{ categoria.id }}</td>
            <td>{{ categoria.nombre }}</td>
            <td class="text-center">
              <button @click="$emit('editar-categoria', categoria)" class="btn btn-warning bi bi-pencil-fill"></button>
              <button @click="deleteCategoria(categoria.id)" class="btn btn-danger bi bi-trash3-fill"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categorias: [],
    };
  },
  methods: {
    fetchCategorias() {
      axios.get("http://localhost:3000/categorias").then((response) => {
        this.categorias = response.data;
      });
    },
    deleteCategoria(id) {
      axios.delete(`http://localhost:3000/categorias/${id}`).then(() => {
        this.fetchCategorias();
      });
    },
  },
  created() {
    this.fetchCategorias();
  },
};
</script>
<style>
  .table-container {
    width: 60%;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: #f8f9fa;
  }
</style>