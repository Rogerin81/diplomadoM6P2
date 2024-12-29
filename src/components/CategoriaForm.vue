<template>
  <div class="text-center">
    <h3>Crear | Editar</h3>
    <form @submit.prevent="saveCategoria">
      <input v-model="categoria.nombre" type="text" placeholder="Nombre de la categoría" required />
      <button type="submit" class="btn btn-primary bi bi-bag-plus-fill"></button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categoria: {
        id: null,
        nombre: "",
      },
    };
  },
  methods: {
    resetForm() {
      // Lógica para resetear el formulario
      console.log('Formulario reseteado');
    },
    saveCategoria() {
      if (this.categoria.id) {
        // Actualizar una categoría existente
        axios.put(`http://localhost:3000/categorias/${this.categoria.id}`, this.categoria).then(() => {
          this.$emit("categoria-actualizada");
        });
      } else {
        // Obtener la lista de categorías para calcular el ID
        axios.get("http://localhost:3000/categorias").then((response) => {
          const categorias = response.data;
          const maxId = categorias.length ? Math.max(...categorias.map(c => c.id)) : 0;
          this.categoria.id = (maxId + 1).toString(); // Nuevo ID correlativo

          // Crear la nueva categoría
          axios.post("http://localhost:3000/categorias", this.categoria).then(() => {
            this.$emit("categoria-actualizada");
          });
        });
      }
      this.resetForm();
    },
  },
  props: ["categoriaEdit"],
  watch: {
    categoriaEdit: {
      handler(newVal) {
        if (newVal) {
          this.categoria = { ...newVal };
        }
      },
      immediate: true,
    },
  },
};
</script>