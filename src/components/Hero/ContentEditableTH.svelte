<script>
    export let handleInput;
    export let handleKeyDown;
    export let handleBlur;
    export let handleFocus;
    export let field;
    export let css = "";
</script>

<th contenteditable="true" 
    class="p-1 text-left indent-2 rounded-md {css}"
    on:input={(e) => handleInput(e, field)}
    on:keydown={handleKeyDown}
    on:blur={() => handleBlur(field)}
    on:focus={() => handleFocus(field)}
    >
    <slot />
</th>

