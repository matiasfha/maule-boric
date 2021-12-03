<script>
	import { onMount } from 'svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/scale.css';

	export let data = [];

	let calendarEl;
	const events = data.map((item) => {
		return {
			title: `${item.comuna} - ${item.name}`,
			start: new Date(item.date),
			allDay: false,
			extendedProps: {
				comuna: item.comuna,
				direccion: item.address,
				contacto: item.contacto
			}
		};
	});

	onMount(async () => {
		await import('@fullcalendar/core/vdom');
		const { Calendar } = await import('@fullcalendar/core');
		const locale = await import('@fullcalendar/core/locales/es');

		/** @type {import('@fullcalendar/core').CalendarOptions}  */
		const options = {
			initialView: 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next',
				center: 'title',
				right: 'dayGridMonth,listWeek,dayGridWeek'
			},
			firstDay: 1,
			events,
			eventDidMount: (info) => {
				const { comuna, direccion, contact } = info.event.extendedProps;
				const comunaText = comuna ? `<strong>Comuna:</strong> ${comuna}<br />` : '';
				const direccionText = direccion ? `<strong>Dirección:</strong> ${direccion}<br />` : '';
				const contactText = contact ? `<strong>Contacto:</strong> ${contact}` : '';
				const text = `${comunaText} ${direccionText} ${contactText}`;

				if (text != '  ') {
					return tippy(info.el, {
						content: text,
						animation: 'scale',
						allowHTML: true
					});
				}
				return null;
			},
			plugins: [
				(await import('@fullcalendar/daygrid')).default,
				(await import('@fullcalendar/list')).default
			],
			themeSystem: 'standard',
			locale: locale.default
		};
		/** @type {import('@fullcalendar/core').Calendar}  */
		let renderCalendar = new Calendar(calendarEl, options);
		renderCalendar.render();
		return () => {
			renderCalendar.destroy();
		};
	});
</script>

<div bind:this={calendarEl} class="px-4 md:px-32" />
