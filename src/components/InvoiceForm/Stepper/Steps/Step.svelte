<script>
    export let step;
    export let colour = 'indigo';
    export let final = false;

    const sections = ['Company', 'Invoice', 'Items', 'Payee', 'Images']

    $: dynamicTextColour = colour === 'indigo' ? 'text-white' : 'text-gray-900'
    $: dynamicBgColour = colour === 'indigo' ? 'bg-indigo-500' : 'bg-gray-100' 

    const emphasis = colour === 'indigo' ? 'font-medium' : 'else'
    const after = final ? "" : colour == 'indigo' ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-300 after:border-4 after:inline-block dark:after:border-blue-800" : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-blue-800"
</script>

<li class="flex w-1/2 items-center {dynamicTextColour} dark:text-blue-500 {after}">
    <span class="flex items-center justify-center w-5 h-5 {dynamicBgColour} rounded-full lg:h-7 lg:w-7 dark:bg-blue-800 shrink-0 {emphasis}">
        {step} 
    </span>
    {#if colour == 'indigo'}
<span class = 'flex items-center border border-white round-full text-xs font-medium text-gray-900 text-left mx-1'>
    {sections[step - 1]}
</span>
{/if}
</li>
