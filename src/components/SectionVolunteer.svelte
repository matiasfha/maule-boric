<script>
	import { browser } from '$app/env';

	import { onDestroy, onMount } from 'svelte';

	const comunas = [
		'Selecciona tu comuna',
		'Cauquenes',
		'Chanco',
		'Pelluhue',
		'Curicó',
		'Hualañé',
		'Licantén',
		'Molina',
		'Rauco',
		'Romeral',
		'Sagrada Familia',
		'Teno',
		'Vichuquén',
		'Colbún',
		'Linares',
		'Longaví',
		'Parral',
		'Retiro',
		'San Javier',
		'Villa Alegre',
		'Yerbas Buenas',
		'Constitución',
		'Curepto',
		'Empedrado',
		'Maule',
		'Pelarco',
		'Pencahue',
		'Río Claro',
		'San Clemente',
		'San Rafael',
		'Talca'
	];
	export let onSubmit;

	let name = '';
	let email = '';
	let comuna = '';
	let phone = '';
	let submitting = false;
	let submitMessage = '';

	let hcaptcha = { execute: async (_a, _b) => ({ response: '' }), render: (_a, _b) => {} };
	let hcaptchaWidgetID;
	let hcaptchSiteKey = import.meta.env.VITE_HCAPTCHA_SITEKEY;

	onMount(() => {
		if (browser) {
			hcaptcha = window.hcaptcha;
			if (hcaptcha.render) {
				hcaptchaWidgetID = hcaptcha.render('hcaptcha', {
					sitekey: import.meta.env.VITE_HCAPTCHA_SITEKEY,
					size: 'invisible',
					theme: 'dark'
				});
			}
		}
	});

	onDestroy(() => {
		if (browser) {
			hcaptcha = { execute: async () => ({ response: '' }), render: () => {} };
		}
	});

	const submitForm = async () => {
		try {
			submitting = true;
			const { response, key } = await hcaptcha.execute(hcaptchaWidgetID, { async: true });

			const result = await onSubmit({
				name,
				email,
				comuna,
				phone,
				captchaToken: response
			});

			submitMessage = 'Gracias por unirte!';
		} catch (e) {
			console.error(e);
			submitMessage = 'Intenta más tarde';
		} finally {
			submitting = false;
		}
	};
</script>

<svelte:head>
	<script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>
</svelte:head>

<section class="relative h-[75rem] md:h-[35rem] bg-lightGreen" id="voluntarios">
	<div class="h-12 bg-lightGreen curve relative -top-6" />
	<div class="w-full grid grid-cols-1 md:grid-cols-2 px-8 md:px-24">
		<div>
			<h2 class="text-yellow text-6xl font-bold text-shadow-sm.">
				¿Quieres ser parte de esta campaña y cambiar Chile?
			</h2>
			<h3 class="text-5xl font-bold mt-8">
				Inscribete y participa como voluntario para la campaña
			</h3>
		</div>
		<form class="px-8 pt-8 md:pt-0 md:px-24 w-full" on:submit|preventDefault={submitForm}>
			<input
				class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
				placeholder="Tu Nombre"
				type="text"
				required={true}
				bind:value={name}
			/>
			<input
				class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
				placeholder="Email"
				type="email"
				required={true}
				bind:value={email}
			/>
			<input
				class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
				placeholder="Teléfono"
				type="phone"
				required={true}
				bind:value={phone}
			/>
			<select
				class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
				placeholder="Comuna"
				bind:value={comuna}
				required={true}
			>
				{#each comunas as comuna}
					<option value={comuna}>{comuna}</option>
				{/each}
			</select>
			<div
				id="hcaptcha"
				class="h-captcha"
				data-sitekey={hcaptchSiteKey}
				data-size="invisible"
				data-theme="dark"
			/>
			<button
				type="submit"
				class="h-captcha bg-yellow text-4xl font-bold flex items-center justify-center mt-2 py-2 w-full rounded-sm drop-shadow-xl hover:bg-mindaro-700"
				disabled={submitting}>#seguimos</button
			>
			<p class="text-green font-bold text-3xl py-2">{submitMessage}</p>
		</form>
	</div>
</section>
