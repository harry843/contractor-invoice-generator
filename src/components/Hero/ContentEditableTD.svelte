<script>
    export let handleInput;
    export let handleKeyDown;
    export let handleBlur;
    export let handleFocus;
    export let field;
    export let css = "";
</script>

<td contenteditable="true" 
    class="border border-gray-300 p-2 {css}"
    on:input={(e) => handleInput(e, field)}
    on:keydown={handleKeyDown}
    on:blur={() => handleBlur(field)}
    on:focus={() => handleFocus(field)}
    >
    <slot />
</td>

