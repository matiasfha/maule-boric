<script>
	import { onMount } from 'svelte';

	import auth from '$lib/authService';
	import { user, isAuthenticated } from '$lib/store';
	let authClient;

	function login() {
		auth.loginWithPopup(authClient);
	}

	function logout() {
		auth.logout(authClient);
	}

	onMount(async () => {
		authClient = await auth.createClient();

		isAuthenticated.set(await authClient.isAuthenticated());
		const u = await authClient.getUser();
		user.set(u);
	});
	let formEl;
	async function submitForm(event) {
		const formData = new FormData(event.target);
		const data = {};
		for (let [key, value] of formData) {
			data[key] = value;
		}
		data.rut = data.rut.replaceAll('.', '');
		try {
			const submit = await fetch('/api/observaciones.json', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			await submit.json();
			alert('Datos ingresados exitosamente!');
			formEl.reset();
		} catch (error) {
			alert('Algo falló. Intenta nuevamente');
			console.error(error);
		}
	}
	const comunas = [
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
	let email = $user.email;
	let submitting = false;
	let submitMessage = '';
	let userName;
	user.subscribe((v) => {
		userName = v.name;
	});
</script>

<svelte:head>
	<title>Maule con Boric - Registro de Observaciones</title>
</svelte:head>

<main class="w-full bg-blue">
	<section class="h-[50rem] flex flex-col items-center justify-center hero relative w-full">
		{#if !$isAuthenticated}
			<div class="absolute top-40">
				<h1
					class="text-4xl md:text-6xl font-bold text-shadow-md text-center pb-8 mt-0 pt-0 text-gray-800"
				>
					Necesitas autorización para ingresar
				</h1>
				<button
					on:click={login}
					class="bg-lightGreen text-lg font-bold flex items-center justify-center mt-2 py-2 w-full rounded-sm drop-shadow-x text-shadow-md"
					>Login</button
				>
			</div>
		{:else}
			<div>
				<div>
					<h2
						class="text-yellow text-4xl md:text-6xl font-bold text-shadow-md text-center pb-8 mt-0 pt-0s"
					>
						Hola {userName}!
						<br />
						Registra observaciones de tu mesa
					</h2>
				</div>
				<form
					on:submit|preventDefault={submitForm}
					class="opacity-100"
					disabled={submitting}
					bind:this={formEl}
				>
					<div
						class="pt-8 md:px-12 w-[90rem] grid grid-cols-3 gap-8 mx-auto bg-gray-100 opacity-90 rounded-md"
					>
						<div>
							<fieldset>
								<legend
									class="mb-6 pb-2 border-b w-full border-solid border-green text-shadow-md tracking-wide text-lg"
									>Datos Apoderad@:</legend
								>
								<div>
									<label for="rut"> Tu Rut </label>
									<input name="rut" placeholder="11222333-4" type="text" required={true} />
								</div>
								<div>
									<label for="email"> Email </label>
									<input
										name="email"
										placeholder="Email"
										type="email"
										required={true}
										bind:value={email}
									/>
								</div>
							</fieldset>
						</div>
						<fieldset>
							<legend
								class="mb-6 pb-2 border-b w-full border-solid border-green text-shadow-md tracking-wide text-lg"
								>Datos Local:</legend
							>
							<div>
								<label for="comuna"> Comuna </label>
								<select name="comuna" placeholder="Selecciona" required={true}>
									<option value="" disabled selected>Selecciona tu Comuna</option>
									{#each comunas as comuna}
										<option value={comuna}>{comuna}</option>
									{/each}
								</select>
							</div>
							<div>
								<label for="ciudad"> Ciudad </label>
								<input name="ciudad" placeholder="Ciudad" type="text" required={true} />
							</div>
							<div>
								<label for="colegio"> Local de Votación </label>
								<input name="local" placeholder="Nombre Colegio" type="text" required={true} />
							</div>
							<div>
								<label for="mesa"> Número de Mesa </label>
								<input name="mesa" placeholder="AV181" type="text" required={true} />
							</div>
						</fieldset>
						<div>
							<label for="observaciones"> Observaciones </label>
							<textarea
								name="observaciones"
								class="mt-1 block w-full h-28 mb-8 rounded-md px-2 py-1 font-sans focus:outline-none focus:ring ring-green bg-white appearance-none leading-tight  focus:bg-white"
							/>
						</div>

						<div class="col-span-3">
							<button
								type="submit"
								class="h-captcha  text-shadow-md bg-yellow text-4xl font-bold flex items-center justify-center mt-2 py-2 w-full rounded-sm drop-shadow-xl hover:bg-mindaro-700"
								disabled={submitting}>Registrar datos</button
							>
							<button
								type="button"
								class="h-captcha text-lg font-bold flex items-center justify-center mt-2 py-2 w-full rounded-sm drop-shadow-x text-shadow-md"
								on:click={logout}>Salir</button
							>
							<p class="text-green font-bold text-3xl py-2">{submitMessage}</p>
						</div>
					</div>
				</form>
			</div>
		{/if}
	</section>
</main>

<style>
	.hero {
		background-image: url('https://maule-aprueba5.webnode.cl/_files/200000004-90ba690ba9/fx-grayscale_200000003.jpg?ph=ce1195ba95&t=1');
		background-repeat: no-repeat;
		background-size: cover;
	}
	input,
	select {
		@apply mt-1 block w-full h-8 mb-4 rounded-md px-2 py-1 font-sans focus:outline-none focus:ring ring-green bg-white appearance-none leading-tight  focus:bg-white;
	}
	input:read-only {
		@apply bg-gray-200 cursor-not-allowed text-gray-500;
	}
	label {
		@apply block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 font-sans;
	}
</style>
