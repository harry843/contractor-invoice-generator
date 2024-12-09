<script lang="ts">

	import Input from "../FormElements/Input.svelte";
	import Select from "../FormElements/Select.svelte";
    import { finishingTouches, currentStep } from "$lib/store";
	import Back from "../FormElements/Back.svelte";
	import InformationAdmonition from "../FormElements/InformationAdmonition.svelte";
	import { updateStoreOnInput } from "$lib/utils";

    export let step;
    export let validationErrors;

    // Subscribe to the store
    $: data = $finishingTouches; // Reactive subscription to the store

    let subject = 'Add your own images!'

    let body = 'Upload your logo and signature to a free image hosting service such as <a class="underline hover:no-underline text-blue-600" href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">imgbb</a> and paste the URL into the optional inputs below.<br><span>&nbsp; e.g. <a class="hover:underline" href="https://i.ibb.co/nDWyxPG/hk-logo.png" target="_blank" rel="noopener noreferrer">https://i.ibb.co/nDWyxPG/hk-logo.png</a></span>  '

    const goToPrevious = () => currentStep.update(n => Math.max(n - 1, 1));

</script>
<div class="grid grid-cols-5 justify-items-start items-center">
    <div class="col-span-2">
    <Back  {step} {goToPrevious} />
    </div>
    <h1 class="col-span-3 text-xl py-2.5 font-semibold text-center font-customHeading">Finishing Touches</h1>
</div>

<!-- Information admontion box -->
<InformationAdmonition {subject} {body} />

<Input
type="text"
label="Logo Image URL"
placeholder = 'Public Image URL'
required={false}
bind:value={data.logoImageUrl}
on:input ={(e) => {updateStoreOnInput(finishingTouches,'logoImageUrl', (e.target as HTMLInputElement).value)}}
tooltipText={'Leaving this field blank will remove the placeholder logo from the pdf output'}
error={validationErrors.logoImageUrl}

/>

<Input
type="text"
label="Signature Image URL"
placeholder = 'Public Image URL'
required={false}
bind:value={data.signatureImageUrl}
on:input ={(e) => {updateStoreOnInput(finishingTouches,'signatureImageUrl', (e.target as HTMLInputElement).value)}}
tooltipText={'Leaving this field blank will remove the placeholder signature from the pdf output'}
error={validationErrors.signatureImageUrl}
/>

<Select
label="Total Due Border Colour"
bind:value={data.totalBorderColour}
on:input ={(e) => {updateStoreOnInput(finishingTouches,'totalBorderColour', (e.target as HTMLInputElement).value)}}>
<option value="indigo">Indigo</option>
<option value="violet">Violet</option>
<option value="purple">Purple</option>
<option value="teal">Teal</option>
<option value="cyan">Cyan</option>
<option value="sky">Sky</option>
<option value="blue">Blue</option>
<option value="fuchsia">Fuchsia</option>
<option value="red">Red</option>
<option value="rose">Rose</option>
<option value="pink">Pink</option>
<option value="orange">Orange</option>
<option value="amber">Amber</option>
<option value="yellow">Yellow</option>
<option value="lime">Lime</option>
<option value="green">Green</option>
<option value="emerald">Emerald</option>
<option value="slate">Slate</option>
<option value="grey">Grey</option>
<option value="zinc">Zinc</option>
<option value="stone">Stone</option>
</Select>