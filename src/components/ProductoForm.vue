<template>
    <div>
      <h3 class="text-center">Agregar</h3>
      <form @submit.prevent="guardarProducto">
        <div class="mb-3">
          <label class="form-label">Nombre del producto</label>
          <input type="text" class="form-control" id="nombre" placeholder="Nombre del producto" v-model="producto.nombre" required>
          <label class="form-label">Precio</label>
          <input type="number" class="form-control" id="precio" placeholder="Precio" v-model="producto.precio" required>
          <label class="form-label">Cantidad</label>
          <input type="number" class="form-control" id="stock" placeholder="Stock" v-model="producto.stock" required>
          <label class="form-label">Categoria</label>
          <select class="form-select" v-model="producto.categoriaId" required>
            <option disabled value="">Selecciona una Categoría</option>
            <option v-for="categoria in categorias" :value="categoria.id" :key="categoria.id">
              {{ categoria.nombre }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary bi bi-bag-plus-fill">&nbsp; &nbsp;Agregar producto</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["categorias"],
    data() {
      return {
        producto: {
          nombre: "",
          precio: "",
          descripcion: "",
          stock: "",
          categoriaId: "",
        },
      };
    },
    methods: {
      async guardarProducto() {
        await axios.post("http://localhost:3000/productos", this.producto);
        this.$emit("productos-actualizados");
        this.producto = { nombre: "", precio: "", descripcion: "", stock: "", categoriaId: "" };
      },
    },
  };
  </script>  