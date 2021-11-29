<script>
	import whatsapp from '../assets/whatsapp.png';
	export let grupos = [];
</script>

<!-- Grupos de Coordinacion-->
<section class="h-[45rem] md:h-[34rem] relative" id="grupos">
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
