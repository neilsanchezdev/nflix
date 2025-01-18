<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-black" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img
                class="size-8"
                src="https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456"
                alt="Your Company"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img class="size-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100 outline-none' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="shrink-0">
              <img class="size-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
            </div>
            <button
              type="button"
              class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Movies', href: '#', current: false },
  { name: 'TV Shows', href: '#', current: false },
  { name: 'My List', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

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
