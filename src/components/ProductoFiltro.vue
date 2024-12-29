<template>
  <div class="mb-4">
    <h3>Filtrar</h3>
    <button class="btn btn-success bi bi-chevron-double-up" @click="filtrarProductos">
      precio mayor a 100
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    // Filtra los productos con precio mayor a 100 y los emite al componente padre
    filtrarProductos() {
      const productosFiltrados = this.$parent.productos.filter(
        (producto) => producto.precio > 100
      );
      this.$emit("productos-filtrados", productosFiltrados);
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>