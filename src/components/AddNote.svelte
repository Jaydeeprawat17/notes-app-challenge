<script>
   import { toast } from '@zerodevx/svelte-toast';

     export let onAdd;
     let title = '';
     let content = '';
     let loading = false;
   
     async function handleSubmit(e) {
       e.preventDefault();
       if (!title || !content) return;
   
       loading = true;
       try {
         const res = await fetch('https://6857d67c21f5d3463e56562b.mockapi.io/api/v1/notes', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             title,
             content,
             createdAt: new Date().toISOString()
           })
         });
   
         const newNote = await res.json();
         onAdd(newNote); 
         title = '';
         content = '';
     
       } catch (err) {
    
         toast.error('Failed to add note!');
       } finally {
         loading = false;
       }
     }
   </script>
   
   <form on:submit={handleSubmit} class="bg-white p-4 mb-6 rounded-xl shadow space-y-4">
     <div>
       <label class="block font-medium text-gray-700 mb-1">Title</label>
       <input bind:value={title} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
         bg-white dark:bg-gray-700 
         text-black dark:text-white 
         placeholder-gray-500 dark:placeholder-gray-400 
         rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter title" />
     </div>
   
     <div>
       <label class="block font-medium text-gray-700 mb-1">Content</label>
       <textarea bind:value={content} rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
         bg-white dark:bg-gray-700 
         text-black dark:text-white 
         placeholder-gray-500 dark:placeholder-gray-400 
         rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter content"></textarea>
     </div>
   
     <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2" disabled={loading}>
      {#if loading}
        <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
        Loading...
      {:else}
        Add Note
      {/if}
    </button>
    
   </form>
   