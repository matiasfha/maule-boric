<script context="module">
	export const prerender = true;
</script>

<script>
	import SectionVoluntarios from '../components/SectionVolunteer.svelte';

	const onSubmit = async (data) => {
		const submit = await fetch('/api/voluntarios.json', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		return await submit.json();
	};
</script>

<svelte:head>
	<title>Maule con Boric - Registro de Voluntarios</title>
</svelte:head>

<main class="w-full bg-lightGreen">
	<section class="h-[35rem] flex flex-col items-center justify-center hero">
		<h1 class="font-bold text-5xl md:text-7xl text-yellow text-shadow-lg px-8 md:px-0 text-center">
			Registrate como voluntario!
		</h1>
	</section>
	<SectionVoluntarios {onSubmit} />

	<section class="hero2 h-[40rem] bg-cover relative bg-lightGreen" />
</main>

<style>
	.hero {
		background-image: url('../assets/comandos.jpeg');
		background-position-y: 70%;
		background-size: cover;
		background-repeat: no-repeat;
	}
	@media (max-width: 640px) {
		.hero {
			background-position: 50% 50%;
		}
	}
	.hero2 {
		background-image: url('../assets/banderazo.jpg');
		background-size: cover;
		background-position-y: 60%;
		clip-path: ellipse(95% 100% at 50% 100%);
	}
	.curve {
		clip-path: ellipse(65% 100% at 50% 100%);
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 2;
	}
</style>
