<script context="module">
	export async function load({ fetch }) {
		try {
			const response = await fetch('/api/grupos.json');
			const calendarResponse = await fetch('/api/calendar.json');
			if (response.ok && calendarResponse.ok) {
				const json = await response.json();
				const calendar = await calendarResponse.json();

				return {
					props: {
						grupos: json,
						calendar
					}
				};
			}

			return {
				status: response.status,
				error: new Error(`Could not load grupos`)
			};
		} catch (e) {
			console.error(e);
		}
	}
</script>

<script>
	import SectionVolunteer from '../components/SectionVolunteer.svelte';

	import whatsapp from '../assets/whatsapp.png';
	export let grupos = [];
	export let calendar;

	const days = [...Array(31).keys()].map((i) => (i += 1));

	const calendarData = days.map((day) => {
		return {
			day,
			events: calendar.filter((item) => item.day === day)
		};
	});

	const submitVolunteer = async (data) => {
		const submit = await fetch('/api/voluntarios.json', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const response = await submit.json();
		console.log(response);
	};
</script>

<main class="w-full bg-lightGreen">
	<section class="h-[35rem] flex items-center justify-center hero">
		<h1
			class="font-bold text-7xl mix-blend-exclusion text-white bg-black shadow-md filter drop-shadow-lg px-8 md:px-0"
		>
			Únete al cambio que el Maule necesita
		</h1>
	</section>
	<SectionVolunteer onSubmit={submitVolunteer} />

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
				{#each grupos as grupo}
					<li class="block">
						<a
							href={grupo.link}
							class="text-yellow text-2xl flex flex-row items-center justify-between py-2 drop-shadow-lg hover:text-mindaro-400  transition-all ease-in duration-200"
						>
							<img src={whatsapp} width="32px" alt="whatsapp" />{grupo.name}</a
						>
					</li>
				{/each}
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
								{event.name}
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
