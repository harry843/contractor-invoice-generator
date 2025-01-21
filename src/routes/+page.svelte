<script lang="ts">
	import Footer from '../components/Footer/Footer.svelte';
	import Action from '../components/Hero/Action.svelte';
	import Feature from '../components/Hero/Feature.svelte';
	import Hero from '../components/Hero/Hero/Hero.svelte';
	import InvoiceDemo from '../components/Hero/InvoiceDemo/InvoiceDemo.svelte';
	import { page } from '$app/stores';


	let screenwidth: number = 0;
</script>

<svelte:head>
	<title>Harry Kelleher</title>
	<meta property="og:title" content="Invoice-r" />
	<meta property="og:type" content="article" />
	<meta name="author" content="Harry Kelleher" />
	<meta name="article:published_time" content={new Date().toLocaleDateString()} />
	<meta property="og:image" content="https://ibb.co/qD7WYwk" />
	<meta
		property="og:description"
		content="Create your invoice in seconds. No sign-ups, no strings attached - absolutely free."
	/>
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:locale" content="en_GB" />
</svelte:head>

<svelte:window bind:innerWidth={screenwidth} />

<div class="bg-hero-pattern dark:bg-gradient-to-b dark:from-gray-900 dark:to-indigo-950">
	<Hero />
	<Feature />
	<InvoiceDemo {screenwidth} />
	<Action />
</div>
<Footer />
