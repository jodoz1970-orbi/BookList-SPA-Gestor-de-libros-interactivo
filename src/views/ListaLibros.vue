<template>
  <div class="space-y-8 pb-32">
    <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-slate-900">Colección de Libros</h1>
            <p class="text-slate-500">Gestiona tus lecturas y añade nuevos descubrimientos.</p>
            <button 
              @click.once="alert('¡Bienvenido a tu gestión de biblioteca! Esta guía solo aparecerá una vez.')"
              class="text-[10px] text-indigo-500 hover:underline cursor-pointer font-medium mt-1"
            >
              (Tip de uso)
            </button>
          </div>
          <button 
            @click="showForm = !showForm"
        class="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
      >
        <Plus size="18" />
        {{ showForm ? 'Cerrar formulario' : 'Añadir nuevo libro' }}
      </button>
    </div>

    <!-- Form Section (v-show requested) -->
    <div v-show="showForm" class="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-slate-700">Título</label>
            <input 
              v-model="newBook.title"
              type="text" 
              placeholder="Ej: El nombre del viento"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              @keyup.enter="handleSubmit"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-slate-700">Autor</label>
            <input 
              v-model="newBook.author"
              type="text" 
              placeholder="Ej: Patrick Rothfuss"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-slate-700">Categoría</label>
            <select 
              v-model="newBook.category"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              <option value="" disabled>Selecciona una categoría</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-slate-700">Sinopsis</label>
            <textarea 
              v-model="newBook.description"
              rows="3"
              placeholder="Breve resumen del libro..."
              class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>
          <button 
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
          >
            Guardar Libro
          </button>
        </form>

        <!-- Real-time Preview (Requested) -->
        <div class="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex flex-col justify-center">
          <div class="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-4">Vista previa en tiempo real</div>
          <div v-if="newBook.title || newBook.author" class="space-y-2">
            <h4 class="text-xl font-bold text-slate-800 break-words">{{ newBook.title || 'Sin título...' }}</h4>
            <div class="flex items-center gap-2 text-indigo-600 font-medium">
              <User size="16" />
              <span>{{ newBook.author || 'Sin autor...' }}</span>
            </div>
            <div v-if="newBook.category" class="inline-block bg-white text-indigo-700 border border-indigo-200 text-xs px-2 py-1 rounded-md font-medium">
              {{ newBook.category }}
            </div>
            <p class="text-sm text-slate-500 mt-4 italic line-clamp-3">
              {{ newBook.description || 'Aquí aparecerá la sinopsis...' }}
            </p>
          </div>
          <div v-else class="text-center py-12 text-slate-400">
            <BookCopy class="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>Empieza a escribir para previsualizar</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Book List -->
    <div class="space-y-4">
      <div v-if="books.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Using custom component Libro.vue with v-bind -->
        <Libro 
          v-for="book in books" 
          :key="book.id" 
          v-bind="book"
          @delete="handleDelete"
        />
      </div>

      <!-- Empty State (v-if requested) -->
      <div v-else class="bg-white border-2 border-dashed border-slate-200 rounded-3xl py-20 text-center">
        <div class="max-w-xs mx-auto space-y-4">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <Inbox class="w-8 h-8 text-slate-400" />
          </div>
          <div class="space-y-1">
            <h3 class="font-bold text-lg">No hay libros disponibles</h3>
            <p class="text-slate-500 text-sm">Empieza añadiendo tu primer libro a la colección.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Plus, User, BookCopy, Inbox } from 'lucide-react';
import { books, addBook, deleteBook } from '../store/books';
import Libro from '../components/Libro.vue';

const showForm = ref(false);
const categories = ['Ficción', 'No Ficción', 'Ciencia', 'Biografía', 'Historia', 'Fantasía', 'Técnico'];

const newBook = reactive({
  title: '',
  author: '',
  category: '',
  description: ''
});

const handleSubmit = () => {
  if (newBook.title && newBook.author && newBook.category) {
    addBook({ ...newBook });
    // Reset form
    newBook.title = '';
    newBook.author = '';
    newBook.category = '';
    newBook.description = '';
    showForm.value = false;
  }
};

const handleDelete = (id: string) => {
  deleteBook(id);
};
</script>
