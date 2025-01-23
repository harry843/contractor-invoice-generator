<script lang="ts">
	import Moon from '../../Icons/Moon.svelte';
	import Sun from '../../Icons/Sun.svelte';
	export let darkMode;
	export let handleSwitchDarkMode;

</script>

<label class="relative flex items-center justify-center cursor-pointer">
	<input
		type="checkbox"
		checked={darkMode}
		value=""
		class="sr-only peer"
		on:change={handleSwitchDarkMode}
	/>

	<div class="ms-2 mr-4">
		{#if darkMode}
			<Moon />
		{:else}
			<Sun />
		{/if}
	</div>
</label>
