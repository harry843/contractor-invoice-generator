<script>
    export let colour = 'indigo';
    export let textColour = 'text-white'
    export let rounded = 'rounded-lg';
    export let disabled = false;

</script>
<button {disabled} type="button" class="{textColour} bg-{colour}-600 hover:bg-{colour}-800 font-medium {rounded} text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-{colour}-600 dark:hover:bg-{colour}-700" on:click>
    <slot />
</button>
