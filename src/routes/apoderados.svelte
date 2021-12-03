<script>
	import { Modals, closeModal, openModal } from 'svelte-modals';
	import ApoderadosModal from '../components/ApoderadosModal.svelte';

	function handleClick() {
		openModal(ApoderadosModal);
	}
</script>

<main class="w-full bg-blue">
	<Modals>
		<div slot="backdrop" on:click={closeModal} />
	</Modals>
	<section class="h-[35rem] flex flex-col items-center justify-center hero">
		<h1 class="font-bold text-5xl md:text-7xl text-yellow text-shadow-lg px-8 md:px-0 text-center">
			1.790 apoderados y apodedaradas se necesitan en el el distrito 17.
		</h1>
		<button
			on:click={handleClick}
			class="h-captcha bg-yellow text-4xl font-bold flex items-center justify-center py-2 w-44 px-8 mt-12 rounded-md drop-shadow-xl hover:bg-mindaro-700"
			>Participa</button
		>
	</section>

	<section class="h-[82rem] md:h-[35rem] relative bg-blue">
		<div class="h-12 bg-blue curve relative -top-10" />
		<div class="grid grid-cols-1 px-8 md:px-48 ">
			<h2 class="text-yellow text-5xl md:text-6xl font-extrabold drop-shadow-xl">
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
			</p>
		</div>
	</section>
	<section class="hero2 h-[40rem] bg-cover relative" />
	<section class="h-[45rem] md:h-[30rem] relative bg-lightGreen">
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
					Serán los existentes en el Maule este 19 de Diciembre. Debemos tener apoderades en cada
					uno de ellos.
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
		background-image: url('https://maule-aprueba5.webnode.cl/_files/200000004-90ba690ba9/fx-grayscale_200000003.jpg?ph=ce1195ba95&t=1');
		background-repeat: no-repeat;
		background-size: cover;
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
