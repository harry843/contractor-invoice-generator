<script>
    import Step from './Steps/Step.svelte';
	import Tick from './Steps/Tick.svelte';
  
    export let step;

    const totalSteps = 5;
    </script>
  
  <ol class="flex items-center px-[2.5%] py-2">
    {#each Array(totalSteps).fill(0).map((_, index) => index + 1) as stepIndex}
      {#if stepIndex < step}
        <Tick />
      {:else if stepIndex === step}
        <Step step={stepIndex} final={stepIndex === totalSteps} />
      {:else}
        <Step step={stepIndex} colour="gray" final={stepIndex === totalSteps} />
      {/if}
    {/each}
  </ol>
  