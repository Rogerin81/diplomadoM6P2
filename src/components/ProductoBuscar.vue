<template>
  <div class="mb-4">
    <h3>Buscar</h3>
    <input
      v-model="busqueda"
      @input="realizarBusqueda"
      type="text"
      placeholder="Buscar producto por nombre"
      class="form-control"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      busqueda: "",
    };
  },
  methods: {
    async realizarBusqueda() {
      try {
        // Obtener los productos desde db.json
        const response = await axios.get("http://localhost:3000/productos");
        const productos = response.data;

        // Filtrar productos por nombre
        const resultados = productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase().trim())
        );

        // Emitir resultados al componente padre
        this.$emit("resultado-busqueda", resultados);
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
</style>