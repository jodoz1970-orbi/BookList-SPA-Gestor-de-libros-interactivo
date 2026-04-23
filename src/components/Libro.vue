<template>
  <div class="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden">
    <div class="absolute top-0 right-0 p-3">
      <button 
        @click.prevent.stop="$emit('delete', id)"
        class="text-slate-300 hover:text-red-500 transition-colors p-1"
        title="Eliminar libro"
      >
        <Trash2 size="18" />
      </button>
    </div>

    <div class="space-y-4 flex-grow cursor-pointer" @click="$router.push(`/libros/${id}`)">
      <div class="space-y-1 pr-8">
        <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
          {{ category }}
        </span>
        <h3 class="font-bold text-lg text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
          {{ title }}
        </h3>
      </div>
      
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <User size="14" />
        <span class="font-medium">{{ author }}</span>
      </div>

      <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
        {{ description || 'Sin descripción disponible.' }}
      </p>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
      <span class="text-[10px] text-slate-300 font-mono">{{ formatDate(createdAt) }}</span>
      <router-link 
        :to="`/libros/${id}`" 
        class="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 group/btn"
      >
        Ver detalles
        <ChevronRight size="12" class="group-hover/btn:translate-x-0.5 transition-transform" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2, User, ChevronRight } from 'lucide-react';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Number, required: true }
});

defineEmits(['delete']);

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
</script>
