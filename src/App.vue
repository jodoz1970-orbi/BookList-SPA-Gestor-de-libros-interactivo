<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <!-- Navbar -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3">
      <div class="max-w-5xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2">
          <BookOpen class="w-6 h-6 text-indigo-600" />
          <span class="font-bold text-xl tracking-tight text-slate-800">BookList</span>
        </div>
        <div class="flex gap-6 items-center">
          <router-link 
            to="/" 
            class="text-sm font-medium hover:text-indigo-600 transition-colors"
            active-class="text-indigo-600"
          >Inicio</router-link>
          <router-link 
            to="/libros" 
            class="text-sm font-medium hover:text-indigo-600 transition-colors"
            active-class="text-indigo-600"
          >Lista de Libros</router-link>
          <div class="h-4 w-px bg-slate-200"></div>
          <span class="text-xs font-mono text-slate-500 uppercase tracking-wider">Usuario: {{ username }}</span>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto p-6">
      <router-view v-slot="{ Component }">
        <transition 
          name="fade" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer Stats (Requested Counter) -->
    <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-lg">
      <div class="max-w-5xl mx-auto flex justify-between items-center text-sm">
        <div class="flex items-center gap-4">
          <span class="text-slate-500">Libros totales: <span class="font-bold text-indigo-600">{{ totalBooks }}</span></span>
          <div class="flex items-center gap-2 bg-slate-100 rounded-lg px-2 py-1">
            <button @click="decrement" class="hover:text-indigo-600 p-1">-</button>
            <span class="font-mono w-4 text-center">{{ counter }}</span>
            <button @click="increment" class="hover:text-indigo-600 p-1">+</button>
          </div>
          <span class="text-xs text-slate-400 italic">Interacciones: {{ counter }}</span>
        </div>
        <div class="text-slate-400 text-xs">
          SPA BookList - Pattern MVVM implementation
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BookOpen } from 'lucide-react';
import { books } from './store/books';

const username = ref('Jodoz');
const counter = ref(0);

const totalBooks = computed(() => books.value.length);

const increment = () => {
  counter.value++;
};

const decrement = () => {
  if (counter.value > 0) counter.value--;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}
</style>
