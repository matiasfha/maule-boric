<script>
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
	function submitForm() {
		onSubmit({
			name,
			email,
			comuna,
			phone
		});
	}
</script>

<section class="relative h-[75rem] md:h-[35rem] bg-lightGreen" id="voluntarios">
	<div class="h-12 bg-lightGreen curve relative -top-6" />
	<div class="w-full grid grid-cols-1 md:grid-cols-2 px-8 md:px-24">
		<div>
			<h2 class="text-yellow text-6xl font-bold drop-shadow-xl ">
				¿Quieres ser parte de esta campaña y cambiar Chile?
			</h2>
			<h3 class="text-5xl font-bold">Inscribete y participa</h3>
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
			<button
				type="submit"
				class="bg-yellow text-4xl font-bold flex items-center justify-center mt-2 py-2 w-full rounded-sm drop-shadow-xl hover:bg-mindaro-700"
				>#seguimos</button
			>
		</form>
	</div>
</section>
