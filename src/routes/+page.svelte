<script lang="ts">
	import Footer from '../components/Footer/Footer.svelte';
	import Action from '../components/Hero/Action.svelte';
	import Feature from '../components/Hero/Feature.svelte';
	import Hero from '../components/Hero/Hero/Hero.svelte';
	import InvoiceDemo from '../components/Hero/InvoiceDemo/InvoiceDemo.svelte';

	let screenwidth: number = 0;
</script>

<svelte:window bind:innerWidth={screenwidth} />

<div class="bg-hero-pattern dark:bg-gradient-to-b dark:from-gray-900 dark:to-indigo-950">
	<Hero />
	<Feature />
	<InvoiceDemo {screenwidth} />
	<Action />
</div>
<Footer />
