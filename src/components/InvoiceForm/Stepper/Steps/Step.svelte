<script>
    export let step;
    export let colour = 'indigo';
    export let final = false;

    const sections = ['Company', 'Invoice', 'Items', 'Payee', 'Images']

    $: dynamicTextColour = colour === 'indigo' ? 'text-white dark:text-black' : 'text-black'
    $: dynamicBgColour = colour === 'indigo' ? 'bg-indigo-500 dark:bg-indigo-50' : 'bg-slate-200 dark:bg-indigo-400' 

    const emphasis = colour === 'indigo' ? 'font-medium' : 'else'
    const after = final ? "" : colour == 'indigo' ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-300 after:border-4 after:inline-block dark:after:border-indigo-50" : "after:content-[''] after:w-full after:h-1 after:border-b after:border-slate-200 after:border-4 after:inline-block dark:after:border-indigo-400"
</script>

<li class="flex w-1/2 items-center {dynamicTextColour}  {after}">
    <span class="flex items-center justify-center w-5 h-5 {dynamicBgColour} rounded-full lg:h-7 lg:w-7 shrink-0 {emphasis}">
        {step} 
    </span>
    {#if colour == 'indigo'}
<span class = 'flex items-center border border-white dark:border-none dark:px-0.5 round-full text-xs font-medium text-gray-900 dark:text-slate-50 text-left mx-1'>
    {sections[step - 1]}
</span>
{/if}
</li>
