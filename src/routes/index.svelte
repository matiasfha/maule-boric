<script context="module">
	export async function load({ fetch }) {
		try {
			const response = await fetch('/api/calendar.json');
			if (response.ok) {
				const calendar = await response.json();

				return {
					props: {
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
	import Calendar from '../components/Calendar.svelte';
	import { Accordion, AccordionItem } from 'svelte-accessible-accordion';
	import TestImg from '../assets/mesa-ciudadana.jpg';
	import { isFuture, isToday, format } from 'date-fns';
	import { es } from 'date-fns/locale';
	import { fade } from 'svelte/transition';

	export let calendar = [];

	$: expanded = {};
	console.log({ expanded });

	let events = calendar
		.filter((item) => {
			const date = new Date(item.date);
			return isFuture(new Date(date)) || isToday(new Date(date));
		})
		.reduce((acc, current) => {
			const { comuna } = current;
			if (comuna) {
				if (!acc[comuna]) {
					acc[comuna] = [];
				}
				acc[comuna] = [...acc[comuna], current];
			}
			return acc;
		}, {});

	function getComunas() {
		return Object.keys(events).sort((a, b) => {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});
	}

	function sortedEvents(comuna) {
		const list = events[comuna].map((item) => {
			return { ...item, date: new Date(item.date) };
		});
		return list.sort((a, b) => a - b);
	}
	function handleClick() {
		openModal(ApoderadosModal);
	}
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

	<!-- APODERADOS -->
	<section class="h-[120rem] md:h-[55rem] relative bg-lightGreen">
		<div class="h-12 bg-lightGreen curve relative -top-10" />
		<div class="grid grid-cols-1 px-8 md:px-48 items-center justify-center">
			<h1
				class="font-bold text-5xl md:text-7xl text-yellow text-shadow-lg px-8 md:px-0 text-center"
			>
				1.790 apoderados y apodedaradas se necesitan en el el distrito 17.
			</h1>

			<h2
				class="pt-24 pb-8 text-yellow text-5xl md:text-6xl font-extrabold drop-shadow-xl text-center"
			>
				¿Qué hace un apoderada u apoderado?
			</h2>
			<p class="text-gray-600 text-xl py-4">
				Según la definición del Servel, es el <em
					>representante de cada posición política, con derecho a voz pero sin voto, que asiste a
					las actuaciones de las Mesas Receptoras de Sufragios (...) para observar el proceso
					eleccionario"</em
				>.
			</p>
			<p class="text-gray-600 text-xl py-4">
				En el caso de nosotras y nosotros, un apoderado y apoderada deberá representar y defender la
				altenarnativa <strong>Boric</strong>, ya sea en el momento del
				<strong>proceso de votación en las urnas</strong>, como también en el
				<strong>proceso de conteo de votos</strong>, en donde, existirán más delegadas y delegados
				de las otras opciones. Tiene que existir 1 representante por mesa (apoderado u apoderada) y
				tendrá como deber acompañar el proceso hasta que se terminen las votaciones y
				<strong
					>se firmen las actas que deben generar los vocales de mesa cuando termine el conteo de
					votos</strong
				>.
			</p>
			<p class="text-xl py-4 text-gray-600">
				Lo importante es poder defender el <strong>derecho a voto</strong> de las personas en un
				margen de respeto, en <strong>pos de la democracia y la transparencia</strong>, y de
				asegurar un buen proceso del plebiscito.
				<strong
					>Las y los apoderados tendrán una credencial que los valide en la jornada y tendrán que
					firmar un documento de su participación durante la misma</strong
				>. Se participará en un local de votación el cual se le comunicará posterior a la
				inscripción como apoderade voluntario.

				<button
					on:click={handleClick}
					class="bg-yellow text-2xl font-bold flex items-center justify-center py-2 w-full md:w-96 px-2 md:px-8 mt-12 rounded-md drop-shadow-xl hover:bg-mindaro-700 md:mx-auto"
					>Participa como Apoderado</button
				>
			</p>
		</div>
	</section>

	<section class="hero2 h-[40rem] bg-cover relative" />

	<!-- Events List-->
	<section class="py-12 bg-gray-50 relative w-full " id="calendar">
		<div class="h-12 bg-gray-50 curve relative -top-16 " />
		<h2 class="text-gray-700 text-6xl font-extrabold drop-shadow-xl text-center mb-12 ">
			Próximos Eventos
			<div class="w-auto px-2 md:px-48 mt-8">
				<Accordion multiselect>
					{#each getComunas() as comuna}
						<AccordionItem title={comuna} expanded>
							<div slot="title" class="border-t border-gray-400 w-full mt-8 pb-8 mb-8">
								<div class="grid grid-flow-col w-32 acordion-title">
									<div role="button" class="cursor-pointer h-8 flex align-bottom pt-2">
										<svg
											viewBox="0 0 100 100"
											class="w-3.5 h-3.5 opacity-100"
											style="transform:rotateZ(90deg)"
											><polygon points="5.9,88.2 50,11.8 94.1,88.2 " /></svg
										>
									</div>

									<div
										class="grid grid-flow-col gap-4 items-center place-self-start cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-800 text-shadow-md text-lg"
									>
										<div>{comuna}</div>
										<div
											class="text-sm text-gray-100 rounded-md bg-gray-400 h-6 w-8 shadow-md opacity-70 mt-1 pt-0.5"
										>
											{events[comuna].length}
										</div>
									</div>
								</div>
							</div>
							<div class="grid p-0 grid-cols-1 md:grid-cols-4 gap-4" transition:fade>
								{#each sortedEvents(comuna) as event}
									<div
										class="transition shadow-md rounded-md bg-white overflow-hidden h-64 flex flex-col  hover:scale-105"
									>
										<div
											class="bg-cover w-full h-40 mb-4"
											style="background-image: url({event.cover})"
										/>
										<strong class="text-sm font-bold text-gray-600 text-left px-2"
											>{event.name}</strong
										>
										<span class="text-xs  text-gray-500 text-left px-2"
											>{format(new Date(event.date), 'eee d MMMM yyyy, HH:mm', {
												locale: es
											})} hrs.</span
										>
										{#if event.address}
											<span class="text-xs  text-gray-500 text-left px-2">{event.address}</span>
										{/if}
									</div>
								{/each}
							</div>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		</h2>
	</section>
	<!-- CALENDARIO -->
	<section class="py-12 bg-blue relative w-full " id="calendar">
		<div class="h-12 bg-blue curve relative -top-16 " />
		<h2 class="text-yellow text-6xl font-extrabold drop-shadow-xl text-center mb-12 ">
			Calendario de Actividades
		</h2>
		<Calendar data={calendar} />
	</section>

	<section class="hero3 h-[40rem] bg-cover relative bg-blue" />

	<!-- KIT DE CAMPAÑA -->
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

	<section class="hero4 h-[40rem] relative bg-blue bg-cover bg-no-repeat" />
	<section class="h-[45rem] md:h-[20rem] relative bg-lightGreen">
		<div class="h-12 bg-lightGreen curve relative -top-10" />
		<div class="grid grid-cols-1 md:grid-cols-3 px-4 md:px-48  md:py-12">
			<div>
				<h2 class="text-2xl text-yellow font-bold pb-4 text-center text-shadow-sm">
					1.790 APODERADOS y APODERADAS
				</h2>
				<p class="text-center text-gray-600">
					Es lo que se necesita para defender voto a voto el Chile que queremos.
				</p>
				<p class="text-center text-gray-600 font-bold">¡Inscribete!</p>
			</div>
			<div>
				<h2 class="text-2xl text-yellow font-bold pb-4 text-center text-shadow-sm">
					100 LOCALES DE VOTACIÓN
				</h2>
				<p class="text-center text-gray-600">
					Serán los existentes en el Maule el 25 de octubre. Debemos tener apoderades en cada uno de
					ellos.
				</p>
				<p class="text-center text-gray-600 font-bold">Recuerda, ¡Inscríbete!</p>
			</div>

			<div>
				<h2 class="text-2xl text-yellow font-bold pb-4 text-center text-shadow-sm">
					892.246 VOTANTES
				</h2>
				<p class="text-center text-gray-600">Son los habilitades a votar en la Región del Maule.</p>
			</div>
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

	.hero4 {
		background-image: url('../assets/diversidad.webp');
		background-position-y: 70%;
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

	.acordion-title {
		grid-template-columns: 18px 1fr;
	}
	:global([data-accordion]) {
		list-style: none;
	}

	:global([data-accordion-item] button) {
		display: flex;
		align-items: flex-start;
		height: 48px;
		width: 100%;
		padding: 0;
		margin-bottom: 0.5rem;
	}

	:global([data-accordion-item] button[disabled]) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global([data-accordion-item] [role='region']) {
		padding: 1rem;
	}
</style>
