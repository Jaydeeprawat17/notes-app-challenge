<script>
     import { toast } from '@zerodevx/svelte-toast';

     export let note;
export let onDelete;
export let onUpdate;
export let isEditing = false;
export let onEdit;
export let onCancelEdit;

let title = note.title;
let content = note.content;
let saving = false;
   
     async function saveChanges() {
       if (!title || !content) return;
       saving = true;
       try {
         const res = await fetch(`https://6857d67c21f5d3463e56562b.mockapi.io/api/v1/notes/${note.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ title, content })
         });
         const updated = await res.json();
         onUpdate(updated);
         isEditing = false;
        
       } catch (err) {
          toast.push('Failed to update!');
         console.error(err);
       } finally {
         saving = false;
       }
     }
   
     function cancelEdit() {
          title = note.title;
  content = note.content;
  onCancelEdit();
     }
   
     async function deleteNote() {
       const confirmDelete = confirm('Delete this note?');
       if (!confirmDelete) return;
       try {
         await fetch(`https://6857d67c21f5d3463e56562b.mockapi.io/api/v1/notes/${note.id}`, {
           method: 'DELETE'
         });
         onDelete(note.id);
        
       } catch (err) {
   
         toast.push('Delete failed');
       }
     }
   </script>
   
   <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2 relative">

     {#if isEditing}
       <input bind:value={title} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
         bg-white dark:bg-gray-700 
         text-black dark:text-white 
         placeholder-gray-500 dark:placeholder-gray-400 
         rounded" />
       <textarea bind:value={content} rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
         bg-white dark:bg-gray-700 
         text-black dark:text-white 
         placeholder-gray-500 dark:placeholder-gray-400 
         rounded"></textarea>
       <div class="flex gap-2 mt-2">
          <button on:click={saveChanges} class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-2" disabled={saving}>
               {#if saving}
                 <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                   <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                   <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                 </svg>
                 Saving...
               {:else}
                 Save
               {/if}
             </button>
             


         <button on:click={cancelEdit} class="bg-gray-300 px-3 py-1 rounded">Cancel</button>
       </div>
     {:else}
       <h2 class="text-lg font-semibold text-indigo-700">{note.title}</h2>
       <p class="text-gray-800">{note.content}</p>
       <p class="text-xs text-gray-400">🕒 {new Date(note.createdAt).toLocaleString()}</p>
   
       <div class="absolute top-2 right-2 flex gap-2">
         <button  on:click={onEdit} title="Edit" class="text-blue-600 hover:text-blue-800">✏️</button>
         <button on:click={deleteNote} title="Delete" class="text-red-500 hover:text-red-700">🗑️</button>
       </div>
     {/if}
   </div>
   