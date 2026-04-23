<template>
  <div v-if="book" class="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
    <button 
      @click="$router.back()"
      class="text-slate-400 hover:text-indigo-600 flex items-center gap-2 text-sm font-medium transition-colors"
    >
      <ArrowLeft size="16" />
      Volver a la lista
    </button>

    <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div class="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-end">
        <div class="space-y-1">
          <span class="bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
            {{ book.category }}
          </span>
          <h1 class="text-3xl font-bold text-white tracking-tight">{{ book.title }}</h1>
        </div>
      </div>

      <div class="p-8 space-y-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <User size="24" />
          </div>
          <div>
            <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Autor destacado</p>
            <p class="text-lg font-semibold text-slate-800">{{ book.author }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="font-bold text-slate-800 flex items-center gap-2">
            <TextSelect size="18" class="text-indigo-600" />
            Sinopsis completa
          </h3>
          <p class="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
            "{{ book.description || 'No hay una sinopsis detallada para este libro todavía. Estamos trabajando para completar la información en nuestra base de datos.' }}"
          </p>
        </div>

        <div class="pt-8 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs">
          <div class="flex items-center gap-2">
            <Calendar size="14" />
            <span>Añadido el {{ fullDate }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Hash size="14" />
            <span>ID: {{ book.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-20 animate-in fade-in">
    <div class="space-y-4">
      <AlertCircle class="w-16 h-12 mx-auto text-amber-500" />
      <h2 class="text-2xl font-bold text-slate-800">Libro no encontrado</h2>
      <p class="text-slate-500">Lo sentimos, no hemos podido localizar el libro solicitado.</p>
      <button 
        @click="$router.push('/libros')"
        class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700"
      >
        Ir a la lista principal
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft, User, TextSelect, Calendar, Hash, AlertCircle } from 'lucide-react';
import { getBookById } from '../store/books';

const route = useRoute();
const bookId = route.params.id as string;
const book = computed(() => getBookById(bookId));

const fullDate = computed(() => {
  if (!book.value) return '';
  return new Date(book.value.createdAt).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});
</script>
