<script>
    export let handleInput;
    export let handleKeyDown;
    export let handleBlur;
    export let handleFocus;
    export let field;
    export let firstInput;
</script>

<p contenteditable="true" 
    bind:this={firstInput} 
    class="font-semibold border border-gray-500 dark:border-gray-200 px-2 py-0.5 rounded-md mb-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    on:input={(e) => handleInput(e, field)}
    on:keydown={handleKeyDown}
    on:blur={() => handleBlur(field)}
    on:focus={() => handleFocus(field)}
    >
    <slot />
</p>

