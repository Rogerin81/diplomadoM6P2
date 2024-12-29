<template>
  <div class="content">
    <h1 class="text-center">Productos</h1>
    <table>
      <tr>
        <td class="align-top">
          <ProductoForm 
            :categorias="categorias" 
            @productos-actualizados="fetchProductos" 
          />
          <ProductoBuscar @resultado-busqueda="actualizarBusqueda" />
          <ProductoFiltro @productos-filtrados="actualizarFiltro" />
        </td>
        <td>
          <ProductoTabla 
            :productos="productosFiltrados" 
            :categorias="categorias" 
            @productos-actualizados="fetchProductos" 
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import CategoriaForm from "../components/CategoriaForm.vue";
import ProductoForm from "../components/ProductoForm.vue";
import ProductoTabla from "../components/ProductoTable.vue";
import ProductoBuscar from "../components/ProductoBuscar.vue";
import ProductoFiltro from "../components/ProductoFiltro.vue";

export default {
  components: {
    CategoriaForm,
    ProductoForm,
    ProductoTabla,
    ProductoBuscar,
    ProductoFiltro,
  },
  data() {
    return {
      productos: [],
      productosFiltrados: [],
      categorias: [],
    };
  },
  methods: {
    async fetchProductos() {
      const response = await axios.get("http://localhost:3000/productos");
      this.productos = response.data;
      this.productosFiltrados = response.data;
    },
    async fetchCategorias() {
      const response = await axios.get("http://localhost:3000/categorias");
      this.categorias = response.data;
    },
    actualizarBusqueda(productos) {
      this.productosFiltrados = productos;
    },
    actualizarFiltro(productos) {
      this.productosFiltrados = productos;
    },
  },
  created() {
    this.fetchProductos();
    this.fetchCategorias();
  },
};
</script>
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  
  .logo {
    object-fit: cover;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 36px;
    color: #333;
  }
  .creator {
    font-size: 18px;
    color: #555;
    margin-top: 20px;
    text-align: center;
  }
  
  .creator strong {
    color: #000;
  }
  .content {
      margin-top: 60px;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 18px;
      text-align: left;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }

    th {
      background-color: #f4f4f4;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  </style>