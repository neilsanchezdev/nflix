<template>
  <header class="bg-black shadow">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-white">Movies</h1>
    </div>
  </header>
  <main class="bg-black">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-5 gap-4">
          <!-- Iterar imágenes desde el JSON -->
          <div class="bg-black p-2 rounded shadow" v-for="item in items" :key="item.id">
            <img
              class="w-full h-auto rounded transform transition duration-300 hover:scale-110 hover:cursor-pointer"
              :src="`${IMAGES_URL_BASE}/w200/${item.poster_path}`"
              :alt="item.title"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between bg-black px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            class="relative inline-flex items-center rounded-md border bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
            >Previous</a
          >
          <a
            href="#"
            class="relative ml-3 inline-flex items-center rounded-md borderbg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
            >Next</a
          >
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-400">
              Showing page
              {{ ' ' }}
              <span class="font-medium">{{ page }}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ totalPages }}</span>
            </p>
          </div>
          <div>
            <nav
              class="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <span
                @click="switchPage(page - 1)"
                class="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="size-5" aria-hidden="true" />
              </span>
              <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 hover:bg-gray-50 focus:outline-offset-0" -->
              <span
                @click="switchPage(1)"
                aria-current="page"
                class="relative z-10 inline-flex items-center px-4 py-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-gray-50 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >1
              </span>
              <span
                @click="switchPage(2)"
                class="relative inline-flex items-center px-4 py-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >2</span
              >
              <span
                @click="switchPage(3)"
                class="relative hidden items-center px-4 py-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >3</span
              >
              <span
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-offset-0"
                >...</span
              >
              <span
                @click="switchPage(totalPages - 2)"
                class="relative hidden items-center px-4 py-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >{{ totalPages - 2 }}</span
              >
              <span
                @click="switchPage(totalPages - 1)"
                class="relative inline-flex items-center px-4 py-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >{{ totalPages - 1 }}</span
              >
              <span
                @click="switchPage(totalPages)"
                class="relative inline-flex items-center px-4 py-2 cursor-pointer text-sm font-semibold text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >{{ totalPages }}</span
              >
              <span
                @click="switchPage(page + 1)"
                class="relative inline-flex items-center cursor-pointer rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="size-5" aria-hidden="true" />
              </span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const items = ref([])
const totalPages = ref(0)
const page = ref(1)
const IMAGES_URL_BASE = ref(import.meta.env.VITE_API_BASE_URL_IMAGES)

const fetchData = async () => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/discover/movie?page=${page.value}`, {
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

      response.json().then((data) => {
        items.value = data.results
        totalPages.value = 500
        page.value = data.page
      })
    })
    .catch((error) => {
      console.log(`Error al cargar las peliculas: ${error.message}`)
    })
}

const switchPage = (value) => {
  if (value < 1 || value > totalPages.value) return

  page.value = value
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>
