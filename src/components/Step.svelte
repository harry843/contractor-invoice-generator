<script>
    export let step;
    export let colour = 'indigo';
    export let final = false;

    const emphasis = colour === 'indigo' ? 'font-bold' : 'else'
    const after = final ? "" : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-blue-800"
</script>

<li class="flex w-1/2 items-center text-{colour}-900 dark:text-blue-500 {after}">
    <span class="flex items-center justify-center w-5 h-5 bg-{colour}-100 rounded-full lg:h-7 lg:w-7 dark:bg-blue-800 shrink-0 {emphasis}">
        {step}
    </span>
</li>