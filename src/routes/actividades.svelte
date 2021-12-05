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
	import Calendar from '../components/Calendar.svelte';
	import { Accordion, AccordionItem } from 'svelte-accessible-accordion';
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
</script>

<main class="w-full bg-lightGreen">
	<section class="hero2 h-[40rem] bg-cover relative" />
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
</main>

<style>
	.hero2 {
		background-image: url('../assets/puertas.jpeg');
		background-size: cover;
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
