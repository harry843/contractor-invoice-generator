<script lang="ts">
	import Footer from '../components/Footer/Footer.svelte';
	import Action from '../components/Hero/Action.svelte';
	import Feature from '../components/Hero/Feature.svelte';
	import Hero from '../components/Hero/Hero/Hero.svelte';
	import InvoiceDemo from '../components/Hero/InvoiceDemo/InvoiceDemo.svelte';

	let screenwidth: number = 0;

	export let data;
</script>

<svelte:head>
    <title>{data.ogMetadata.title}</title>
    <meta property="og:title" content={data.ogMetadata.title} />
    <meta property="og:type" content={data.ogMetadata.type} />
    <meta property="og:description" content={data.ogMetadata.description} />
    <meta property="og:image" content={data.ogMetadata.image} />
    <meta property="og:url" content={data.ogMetadata.url} />
    <meta property="og:locale" content={data.ogMetadata.locale} />
</svelte:head>

<svelte:window bind:innerWidth={screenwidth} />

<div class="bg-hero-pattern dark:bg-gradient-to-b dark:from-gray-900 dark:to-indigo-950">
	<Hero />
	<Feature />
	<InvoiceDemo {screenwidth} />
	<Action />
</div>
<Footer />
