<script>
	import Input from './Input.svelte';
	// import Select from './Select.svelte';
	import Button from './Button.svelte';
    import { invoiceData } from "$lib/store";

	
	export let onSubmit = () => {};

	let businessName = $invoiceData.businessName ?? '';
    let businessAddressLine1 = $invoiceData.businessAddressLine1 ?? '';
    let businessAddressLine2= $invoiceData.businessAddressLine2 ?? '';

	let type = data.type ?? 'original';
	let errors = {};
	let touchedFields = {};
	
	$: result = {
		businessName, businessAddressLine1, businessAddressLine2
	};
	
	$: errors = validate(touchedFields, result);

	const validate = () => {
		const errors = {};
		if ((touchedFields.businessName && businessName === '') || 
            (touchedFields.businessAddressLine1 && businessAddressLine1 === '') || 
            (touchedFields.businessAddressLine2 && businessAddressLine2 === '')) {
			errors.name = 'Information is required';
		}
		return errors;
	};
	
	const validateAndSubmit = () => {
		touchedFields = { businessName: true, businessAddressLine1: true, businessAddressLine2: true };
		if (!Object.keys(errors).length) {
			onSubmit(result);
		}
	};
</script>

<div class="form">
	<fieldset class="fieldset">
		<legend>Form</legend>
		<Input
			type="text"
			label="Business Name"
			bind:value={businessName}
			on:blur={() => touchedFields.businessName = true}
			error={errors.name}
		/>
		<Input
			type="text"
			label="Business Address Line 1"
			bind:value={businessAddressLine1}
			on:blur={() => touchedFields.businessAddressLine1 = true}
			error={errors.name}
		/>
        <Input
        type="text"
        label="Business Address Line 2"
        bind:value={businessAddressLine2}
        on:blur={() => touchedFields.businessAddressLine2 = true}
        error={errors.name}
    />
 
		<!-- <Button on:click={validateAndSubmit}>Submit</Button>
		<div>
			<pre>
				{JSON.stringify(result, null, 2)}
			</pre>
		</div> -->
	</fieldset>
</div>


<style>
	.fieldset > * {
		display: block;
	}
	
	.fieldset > :global(:not(legend) + *) {
		margin-top: 16px;
	}
	
	.fieldset {
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 20px;
	}
</style>