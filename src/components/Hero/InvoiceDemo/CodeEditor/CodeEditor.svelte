<script lang="ts">
import type { editor } from 'monaco-editor';
import { onMount, onDestroy } from 'svelte';

    export let code;
    export let language;
    export let theme;
  
    let monaco; 
    let codeEditor: editor.IStandaloneCodeEditor;
    let editorContainer: HTMLElement;
  
    onMount(async () => {
      const monacoModule = await import('monaco-editor');
      monaco = monacoModule;
      codeEditor = monaco.editor.create(editorContainer, {
        value: code,
        language: language,
        theme: theme,
      });
    });
  
    // Cleanup on destroy
    onDestroy(() => {
        codeEditor && codeEditor.dispose();
    });
  </script>
  
  <style>
    .editor-container {
      height: 100%; /* Ensure editor fills its container */
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  </style>
  
  <!-- Editor Container -->
  <div bind:this={editorContainer} class="editor-container"></div>
  