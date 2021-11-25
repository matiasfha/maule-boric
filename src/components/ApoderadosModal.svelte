<script>
	import { closeModal } from 'svelte-modals';

	// provided by Modals
	// Modal 420
	export let isOpen;
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div
			class="p-0 md:p-5 bg-white flex flex-col w-[420px] md:w-[640px]  h-full rounded-md justify-between"
		>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfblZx66E20JjilWpD37k6gIWPIebjrWSywgLhTB8e1tJq5Ow/viewform?embedded=true"
				width="100%"
				height="100%"
				frameborder="0"
				marginheight="0"
				marginwidth="0"
				title="Formulario Apoderados">Cargando…</iframe
			>
			<button on:click={closeModal} class="cursor-pointer p-2 bg-yellow text-gray-600 mt-2 z-50"
				>Cerrar formulario</button
			>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
