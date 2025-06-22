<script>
  import { onMount } from 'svelte';
  import NoteCard from './components/NoteCard.svelte';
  import AddNote from './components/AddNote.svelte';
  import { toast, SvelteToast } from '@zerodevx/svelte-toast';
  import { fade, slide } from 'svelte/transition';



  let notes = [];
  let loading = true;
  let editingNoteId = null;
  const API_URL = 'https://6857d67c21f5d3463e56562b.mockapi.io/api/v1/notes';
  let dark = false;

$: {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
onMount(async () => {
  try {
    const res = await fetch(API_URL);
    notes = await res.json();
  } catch (err) {
    toast.push('Failed to fetch notes');
  } finally {
    loading = false;
  }
});

  function addNoteToList(note) {
    notes = [note, ...notes]; 
   toast.push('Note added!');
  }
  function removeNoteFromList(id) {
  notes = notes.filter(note => note.id !== id);
  toast.push('Note deleted!');
}
function updateNoteInList(updatedNote) {
  notes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
  toast.push('Note updated!');
}


</script>

<main class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 max-w-3xl mx-auto">

  <SvelteToast />
  <div class="text-right mb-4">
    <button
      on:click={() => (dark = !dark)}
      class="bg-gray-200 dark:bg-gray-800 text-sm text-gray-800 dark:text-white px-3 py-1 rounded-md shadow hover:scale-105 transition"
    >
      {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  </div>

  <h1 class="text-3xl font-bold text-center mb-6">📝 My Notes</h1>

  <AddNote onAdd={addNoteToList} />

  {#if loading}
  <div class="text-center text-gray-600 dark:text-gray-400 mt-10 animate-pulse">
    Loading notes...
  </div>
{:else}
  {#if notes.length === 0}
    <p class="text-center text-gray-500 dark:text-gray-400">No notes yet. Add one!</p>
  {/if}

  <div class="grid gap-4 mt-4">
    {#each notes as note, i (note.id)}
    <div in:slide={{ delay: i * 50, duration: 300 }} out:fade={{ duration: 150 }}>
      <NoteCard
        {note}
        onDelete={removeNoteFromList}
        onUpdate={updateNoteInList}
        isEditing={editingNoteId === note.id}
        onEdit={() => (editingNoteId = note.id)}
        onCancelEdit={() => (editingNoteId = null)}
      />
    </div>
  {/each}
  
  </div>
{/if}
</main>
