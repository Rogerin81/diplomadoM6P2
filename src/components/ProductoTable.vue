<template>
  <div>
    <!-- Tabla de productos -->
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ obtenerNombreCategoria(producto.categoriaId) }}</td>
          <td class="text-center">
            <button @click="editarProducto(producto)" class="btn btn-warning bi bi-pencil-fill"></button>
            <button @click="eliminarProducto(producto.id)" class="btn btn-danger bi bi-trash3-fill"></button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar producto -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <span @click="cerrarModal" class="close text-end">&times;</span>
        <h2 class="text-center">Editar</h2>
        <form @submit.prevent="actualizarProducto">
          <div>
            <label for="nombre" class="form-label">Nombre</label>
            <input class="form-control" type="text" v-model="productoEdicion.nombre" id="nombre" required />
          </div>
          <div>
            <label for="precio">Precio</label>
            <input class="form-control" type="number" v-model="productoEdicion.precio" id="precio" required />
          </div>
          <div>
            <label for="stock">Stock</label>
            <input class="form-control" type="number" v-model="productoEdicion.stock" id="stock" required />
          </div>
          <div>
            <label for="categoria">Categoría</label>
            <select v-model="productoEdicion.categoriaId" id="categoria" class="form-select" required>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                {{ categoria.nombre }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["productos", "categorias"],
  data() {
    return {
      // Datos del producto que estamos editando
      productoEdicion: {
        id: null,
        nombre: "",
        precio: 0,
        stock: 0,
        categoriaId: null,
      },
      // Control para mostrar/ocultar el modal
      mostrarModal: false,
    };
  },
  methods: {
    obtenerNombreCategoria(id) {
      const categoria = this.categorias.find((cat) => cat.id === id);
      return categoria ? categoria.nombre : "Sin Categoría";
    },

    async eliminarProducto(id) {
      await axios.delete(`http://localhost:3000/productos/${id}`);
      this.$emit("productos-actualizados");
    },

    // Método para abrir el modal con los datos del producto a editar
    editarProducto(producto) {
      this.productoEdicion = { ...producto }; // Clonar el producto
      this.mostrarModal = true; // Mostrar el modal
    },

    // Método para cerrar el modal
    cerrarModal() {
      this.mostrarModal = false;
    },

    // Método para actualizar el producto
    async actualizarProducto() {
      // Realizamos la solicitud PUT para actualizar el producto
      await axios.put(`http://localhost:3000/productos/${this.productoEdicion.id}`, this.productoEdicion);
      
      // Cerramos el modal y actualizamos los productos
      this.cerrarModal();
      this.$emit("productos-actualizados");
    },
  },
};
</script>
<style scoped>
/* Estilos para el modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* Fondo oscuro */
}

.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>