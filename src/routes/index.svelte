<script>
	import whatsapp from '../assets/whatsapp.png';

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

	const days = [...Array(31).keys()].map((i) => (i += 1));
	const events = [
		{
			day: 1,
			description: 'Some event'
		},
		{
			day: 1,
			description: 'Some event with long description that should be show as tooltip'
		},
		{
			day: 1,
			description: 'Some event'
		},
		{
			day: 1,
			description: 'Some event'
		},
		{
			day: 1,
			description: 'Some event'
		},
		{
			day: 14,
			description: 'Some event'
		}
	];
	const calendarData = days.map((day) => {
		return {
			day,
			events: events.filter((item) => item.day === day)
		};
	});
</script>

<main class="w-full bg-lightGreen">
	<section class="h-[35rem] flex items-center justify-center hero">
		<h1
			class="font-bold text-7xl mix-blend-exclusion text-white bg-black shadow-md filter drop-shadow-lg px-8 md:px-0"
		>
			Únete al cambio que el Maule necesita
		</h1>
	</section>
	<section class="relative h-[75rem] md:h-[35rem] bg-lightGreen" id="voluntarios">
		<div class="h-12 bg-lightGreen curve relative -top-6" />
		<div class="w-full grid grid-cols-1 md:grid-cols-2 px-8 md:px-24">
			<div>
				<h2 class="text-yellow text-6xl font-bold drop-shadow-xl ">
					¿Quieres ser parte de esta campaña y cambiar Chile?
				</h2>
				<h3 class="text-5xl font-bold">Inscribete y participa</h3>
			</div>
			<form class="px-8 pt-8 md:pt-0 md:px-24 w-full">
				<input
					class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
					placeholder="Tu Nombre"
				/>
				<input
					class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
					placeholder="Email"
					type="email"
				/>
				<input
					class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
					placeholder="Teléfono"
					type="phone"
				/>
				<select
					class="form-input mt-1 block w-full h-16 mb-8 rounded-md p-2 font-sans focus:outline-none focus:ring ring-green"
					placeholder="Comuna"
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

	<section class="hero2 h-[40rem] bg-cover relative" />
	<section class="h-[75rem] md:h-[35rem] relative bg-blue" id="kit">
		<div class="h-12 bg-blue curve relative -top-10" />
		<div class="grid grid-cols-1 md:grid-cols-2 px-8 md:px-48  py-12 ">
			<div class="relative">
				<img
					src="https://boricpresidente.cl/imagenes/cajaHerramientas.webp"
					alt="kit gráfico"
					width="392px"
					class="drop-shadow-xl"
				/>
			</div>
			<div class="px-8 md:px-24">
				<h2 class="text-yellow text-6xl font-extrabold drop-shadow-xl">Arma tu Campaña</h2>
				<p class="text-white text-3xl py-8">
					Descarga nuestro kit y crea tus propios insumos de campaña. ¡De ti depende!
				</p>
				<p class="pt-8 mb-2 text-white text-xl">Descarga tu</p>
				<a
					href="https://drive.google.com/drive/folders/1vwqqSnxHIyv9wI617h8pUers1OudaBo0"
					class="bg-yellow text-3xl font-bold flex items-center justify-center mt-2 py-2 w-full rounded-sm drop-shadow-xl hover:bg-mindaro-700"
					>KIT GRÁFICO AQUÍ</a
				>
			</div>
		</div>
	</section>

	<section class="hero3 h-[40rem] bg-cover relative bg-blue" />

	<section class="h-[35rem] md:h-[30rem] relative" id="grupos">
		<div class="h-12 bg-lightGreen curve relative -top-10" />
		<div class="grid grid-cols-1 md:grid-cols-2 px-8 md:px-48  py-12 ">
			<h2 class="text-yellow text-6xl font-extrabold drop-shadow-xl">
				Únete a los grupos de coordinación
			</h2>

			<ul class="list-none w-full md:w-[24rem] ml-0 md:ml-32 py-8 md:py-0">
				<li class="block">
					<a
						href="/"
						class="text-yellow text-2xl flex flex-row items-center justify-between py-2 drop-shadow-lg hover:text-mindaro-400  transition-all ease-in duration-200"
					>
						<img src={whatsapp} width="32px" alt="whatsapp" />Independientes Boric Maule</a
					>
				</li>
				<li class="block">
					<a
						href="/"
						class="text-yellow text-2xl flex flex-row items-center justify-between py-2 drop-shadow-lg hover:text-mindaro-400  transition-all ease-in duration-200"
					>
						<img src={whatsapp} width="32px" alt="whatsapp" />Difusión Comando Talca</a
					>
				</li>
				<li class="block">
					<a
						href="/"
						class="text-yellow text-2xl flex flex-row items-center justify-between py-2 drop-shadow-lg hover:text-mindaro-400  transition-all ease-in duration-200"
					>
						<img src={whatsapp} width="32px" alt="whatsapp" />Independientes con Boric</a
					>
				</li>
			</ul>
		</div>
	</section>
	<section class="py-12 bg-blue relative w-full hidden md:block" id="calendar">
		<div class="h-12 bg-blue curve relative -top-16 " />
		<h2 class="text-yellow text-6xl font-extrabold drop-shadow-xl text-center mb-12 ">
			Calendario de Actividades
		</h2>
		<div class="grid grid-cols-7 px-24">
			{#each calendarData as item}
				<div class="w-full h-60 border-2 border-yellow">
					<div class="flex flex-row justify-between items-center pr-2">
						<p
							class="text-xl pl-4 py-2 h-12 w-12 flex flex-row items-end border-r-2 border-b-2  border-green"
						>
							{item.day}
						</p>
						<span class="text-green text-sm">&nbsp;{item.events.length} eventos</span>
					</div>

					<div class="flex flex-col gap-2 px-4 overflow-y-scroll h-40 py-10   ">
						{#each item.events as event}
							<p
								class="bg-green p-2 text-white font-bold rounded-md text-sm w-44 overflow-hidden overflow-ellipsis min-h-full max-h-8"
							>
								{event.description}
							</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<style>
	.hero {
		background: url('../assets/boric-plantando.jpg') no-repeat;
		background-size: cover;
	}

	.hero2 {
		background-image: url('../assets/banderazo.jpg');
		background-size: cover;
		background-position-y: 60%;
		clip-path: ellipse(95% 100% at 50% 100%);
	}
	@media (max-width: 640px) {
		.hero2 {
			clip-path: none;
		}
	}

	.hero3 {
		background-image: url('../assets/mesa-ciudadana.jpg');
		background-size: cover;
		background-position-y: 60%;
	}
	.curve {
		clip-path: ellipse(65% 100% at 50% 100%);
	}

	.circulo {
		width: 28em;
		height: 28em;
		transform: translate(-25%, -50%) scale(0.9);
		background: #70e7d3;
		border-radius: 50%;
	}
</style>
