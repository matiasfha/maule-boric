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
	import { Modals, closeModal, openModal } from 'svelte-modals';
	import ApoderadosModal from '../components/ApoderadosModal.svelte';

	import SectionVolunteer from '../components/SectionVolunteer.svelte';
	import Calendar from '../components/Calendar.svelte';
	import whatsapp from '../assets/whatsapp.png';

	export let calendar = [];
	export let grupos = [];

	function handleClick() {
		openModal(ApoderadosModal);
	}

	const submitVolunteer = async (data) => {
		const submit = await fetch('/api/voluntarios.json', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		return await submit.json();
	};
</script>

<main class="w-full bg-lightGreen">
	<Modals>
		<div slot="backdrop" on:click={closeModal} />
	</Modals>
	<section class="h-[35rem] flex flex-col items-center justify-center hero">
		<h1
			class="font-bold text-7xl mix-blend-exclusion text-white bg-black text-shadow-lg px-8 md:px-0"
		>
			Únete al cambio que el Maule necesita
		</h1>
		<button
			on:click={handleClick}
			class="h-captcha bg-yellow text-2xl font-bold flex items-center justify-center py-2 w-96 px-8 mt-12 rounded-md drop-shadow-xl hover:bg-mindaro-700"
			>Participa como Apoderado</button
		>
	</section>
	<SectionVolunteer onSubmit={submitVolunteer} />

	<section class="hero2 h-[40rem] bg-cover relative" />
	<section class="h-[58rem] md:h-[35rem] relative bg-blue" id="kit">
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

	<section class="h-[45rem] md:h-[30rem] relative" id="grupos">
		<div class="h-12 bg-lightGreen curve relative -top-10" />
		<div class="grid grid-cols-1 md:grid-cols-2 px-4 md:px-48  py-12">
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
	<section class="py-12 bg-blue relative w-full " id="calendar">
		<div class="h-12 bg-blue curve relative -top-16 " />
		<h2 class="text-yellow text-6xl font-extrabold drop-shadow-xl text-center mb-12 ">
			Calendario de Actividades
		</h2>
		<Calendar data={calendar} />
		<!-- <FullCalendar {options} class="px-4 md:px-24" /> -->
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
</style>
