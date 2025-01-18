<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const IMAGES_URL_BASE = ref(import.meta.env.VITE_API_BASE_URL_IMAGES)

const fetchData = async () => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/discover/movie`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      response.json().then((data) => (items.value = data.results))
    })
    .catch((error) => {
      console.log(`Error al cargar las peliculas: ${error.message}`)
    })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
    <div class="mt-2">
      <input
        type="email"
        name="email"
        id="email"
        autocomplete="email"
        required
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>

  <table>
    <tbody>
      <tr>
        <td>Nombre</td>
        <td>Fecha de estreno</td>
        <td>imagen</td>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.release_date }}</td>
        <td><img :src="`${IMAGES_URL_BASE}/w200/${item.poster_path}`" :alt="item.title" /></td>
      </tr>
    </tbody>
  </table>
</template>
