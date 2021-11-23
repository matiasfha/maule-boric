<script>
	import '../app.css';
	import Logo from '../assets/logo.png';
</script>

<header class="flex items-center justify-between h-[5rem] shadow bg-green px-6">
	<a href="/">
		<img src={Logo} alt="Boric Presidente" class="h-24" />
	</a>

	<ul class="flex-row list-none hidden md:flex">
		<li class="text-yellow pl-6 font-bold">
			<a
				href="https://s3.amazonaws.com/cdn.boricpresidente.cl/web/programa/Plan+de+gobierno+AD+2022-2026+(1).pdf"
				>Programa</a
			>
		</li>
		<li class="text-yellow pl-6 font-bold"><a href="/#voluntarios">Voluntarios</a></li>
		<li class="text-yellow pl-6 font-bold"><a href="/#calendario">Calendario Actividades</a></li>
		<li class="text-yellow pl-6 font-bold"><a href="/">Apoderados</a></li>
		<li class="text-yellow pl-6 font-bold">
			<a href="https://drive.google.com/drive/folders/1vwqqSnxHIyv9wI617h8pUers1OudaBo0"
				>Kit Gráfico</a
			>
		</li>
	</ul>
</header>
<slot />
<footer class="bg-green py-12 flex items-center  justify-center">
	<img src={Logo} alt="Boric Presidente" class="h-52" />
</footer>
