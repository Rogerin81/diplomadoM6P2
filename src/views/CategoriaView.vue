<template>
  <div id="app" class="content">
    <h1 class="text-center">Categorías</h1>
    <table>
      <tr>
        <td><CategoriaForm @categoria-actualizada="fetchCategorias" :categoriaEdit="categoriaEdit" /></td>
        <td><CategoriaTable @editar-categoria="editarCategoria" /></td>
      </tr>
    </table>
  </div>
</template>
<script>
import CategoriaForm from '../components/CategoriaForm.vue';
import CategoriaTable from '../components/CategoriaTable.vue';

export default {
  components: {
    CategoriaForm,
    CategoriaTable,
  },
  data() {
    return {
      categoriaEdit: null,
    };
  },
  methods: {
    fetchCategorias() {
      // Lógica para obtener categorías
      console.log('Categorías actualizadas');
    },
    editarCategoria(categoria) {
      this.categoriaEdit = categoria;
    },
  },
};
</script>
