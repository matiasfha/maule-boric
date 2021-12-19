<script>
	import '../app.css';
	import Logo from '../assets/logo.png';
	export let open = false;
</script>

<header class="flex items-center justify-between h-[5rem] shadow-lg bg-green px-6">
	<a href="/">
		<img src={Logo} alt="Boric Presidente" class="h-24" />
	</a>
	<nav>
		<ul class="flex-row list-none hidden md:flex">
			<li class="text-yellow pl-6 font-bold">
				<a
					href="https://s3.amazonaws.com/cdn.boricpresidente.cl/web/programa/Plan+de+gobierno+AD+2022-2026+(1).pdf"
					>Programa</a
				>
			</li>
			<li class="text-yellow pl-6 font-bold"><a href="/comandos">Registra tu comando</a></li>
			<li class="text-yellow pl-6 font-bold"><a href="/voluntarios">Voluntarios</a></li>
			<li class="text-yellow pl-6 font-bold"><a href="/actividades">Calendario Actividades</a></li>

			<li class="text-yellow pl-6 font-bold">
				<a href="https://drive.google.com/drive/folders/1vwqqSnxHIyv9wI617h8pUers1OudaBo0"
					>Kit Gráfico</a
				>
			</li>
		</ul>
		<aside
			class="absolute w-full h-full bg-green border-r-2 shadow-lg sm:hidden top-0 z-10"
			class:open
		>
			<ul class="flex-col list-none flex text-3xl mt-8">
				<li class="text-yellow pl-6 font-bold pt-4">
					<a
						on:click={() => (open = false)}
						href="https://s3.amazonaws.com/cdn.boricpresidente.cl/web/programa/Plan+de+gobierno+AD+2022-2026+(1).pdf"
						>Programa</a
					>
				</li>
				<li class="text-yellow pl-6 font-bold pt-4">
					<a on:click={() => (open = false)} href="/comandos">Registra tu Comando</a>
				</li>
				<li class="text-yellow pl-6 font-bold pt-4">
					<a on:click={() => (open = false)} href="/voluntarios">Voluntarios</a>
				</li>
				<li class="text-yellow pl-6 font-bold pt-4">
					<a on:click={() => (open = false)} href="/actividades">Calendario Actividades</a>
				</li>

				<li class="text-yellow pl-6 font-bold pt-4">
					<a
						on:click={() => (open = false)}
						href="https://drive.google.com/drive/folders/1vwqqSnxHIyv9wI617h8pUers1OudaBo0"
						>Kit Gráfico</a
					>
				</li>
			</ul>
		</aside>

		<div class="md:hidden flex items-center">
			<button class="outline-none mobile-menu-button" class:open on:click={() => (open = !open)}>
				<svg width="32" height="24">
					<line id="top" x1="0" y1="2" x2="32" y2="2" />
					<line id="middle" x1="0" y1="12" x2="24" y2="12" />
					<line id="bottom" x1="0" y1="22" x2="32" y2="22" />
				</svg>
			</button>
		</div>
	</nav>
</header>
<slot />
<footer class="bg-green pt-12 pb-4 flex items-center  justify-between flex-col relative">
	<img src={Logo} alt="Boric Presidente" class="h-52" />
	<p class="text-md text-yellow">
		Hecho por <a
			class="text-lightGreen hover:text-mindaro-800 hover:underline"
			href="https://matiashernandez.dev">Matías Hernández</a
		>
		-
		<a
			class="text-lightGreen hover:text-mindaro-800 hover:underline"
			href="https://twitter.com/matiasfha"
			target="_blank">&lt;twitter: @matiasfha&gt;</a
		>
	</p>
	<p class="text-md text-yellow">
		Hecho con <a
			href="https://kit.svelte.dev"
			class="text-lightGreen hover:text-mindaro-800 hover:underline">SvelteKit</a
		>
		- Source code on
		<a
			href="https://github.com/matiasfha/maule-boric"
			class="text-lightGreen hover:text-mindaro-800 hover:underline"
			target="_blank">github</a
		>
	</p>
</footer>

<style>
	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}

	svg line {
		/* `currentColor` means inherit color from the text color */
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.3s ease-in-out;
	}

	/* adjust the Z-index, so that the icon is on top of the sidebar */
	button {
		z-index: 20;
	}

	.open svg {
		transform: scale(0.7);
	}

	/* rotate the top line */
	.open #top {
		transform: translate(6px, 0px) rotate(45deg);
	}

	/* hide the middle */
	.open #middle {
		opacity: 0;
	}

	/* rotate the bottom line */
	.open #bottom {
		transform: translate(-12px, 9px) rotate(-45deg);
	}

	aside {
		/* offscreen by default */
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	aside.open {
		/* slide on screen */
		left: 0;
	}
</style>
