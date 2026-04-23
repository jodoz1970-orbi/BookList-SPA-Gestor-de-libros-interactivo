<template>
  <div class="space-y-12 py-8">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-slate-900 tracking-tight">Bienvenido a BookList</h1>
      <p class="text-slate-500 max-w-2xl mx-auto">
        Tu rincón personal para organizar y gestionar tu biblioteca digital. 
        Añade libros, categorízalos y lleva un registro de tus autores favoritos.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <LayoutGrid class="w-6 h-6" />
        </div>
        <h3 class="font-semibold text-lg">Organización</h3>
        <p class="text-sm text-slate-500">Clasifica tus libros por categorías personalizadas de manera sencilla.</p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <BookCopy class="w-6 h-6" />
        </div>
        <h3 class="font-semibold text-lg">Historial</h3>
        <p class="text-sm text-slate-500">Mantén un registro detallado de cada obra en tu colección.</p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
          <MousePointerClick class="w-6 h-6" />
        </div>
        <h3 class="font-semibold text-lg">Interactividad</h3>
        <p class="text-sm text-slate-500">Interfaz fluida y reactiva diseñada para una experiencia de usuario superior.</p>
      </div>
    </div>

    <div class="flex justify-center pt-8">
      <router-link 
        to="/libros" 
        class="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95"
      >
        Explorar mi lista
        <ArrowRight class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutGrid, BookCopy, MousePointerClick, ArrowRight } from 'lucide-react';
</script>
