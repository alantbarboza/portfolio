const carregador = document.querySelector("#pre-carregamento");
if (carregador) {
	window.addEventListener("load", () => {
		setTimeout(() => carregador.style.display = "none", 1000);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const ano = document.querySelector('#ano');
	if (ano) ano.textContent = new Date().getFullYear();

	const abas = document.querySelectorAll('.editor-abas .aba');
	const conteudos = document.querySelectorAll('.editor-conteudo .exp-conteudo');
	if (abas.length && conteudos.length) {
		abas.forEach(aba => {
			aba.addEventListener('click', () => {
				abas.forEach(a => a.classList.remove('ativo'));
				conteudos.forEach(c => c.classList.remove('ativo'));
				aba.classList.add('ativo');
				const idConteudo = '#exp-' + aba.dataset.exp;
				document.querySelector(idConteudo)?.classList.add('ativo');
			});
		});
	}

	const menuToggle = document.querySelector('#menu-toggle');
	const barraNavegacao = document.querySelector('#barra-navegacao');
	if (menuToggle && barraNavegacao) {
		menuToggle.addEventListener('click', () => {
			barraNavegacao.classList.toggle('ativo');
		});
	}

	const secoes = document.querySelectorAll('section');
	const linksNavegacao = document.querySelectorAll('header nav a');
	const cabecalho = document.querySelector('.cabecalho');

	window.onscroll = () => {
		const topo = window.scrollY;
		secoes.forEach(secao => {
			const altura = secao.offsetHeight;
			const id = secao.getAttribute('id');
			const deslocamento = secao.offsetTop - (window.innerWidth <= 768 ? 190 : 90);

			if (topo >= deslocamento && topo < deslocamento + altura) {
				barraNavegacao?.classList.remove('ativo');
				linksNavegacao.forEach(link => link.classList.remove('ativo'));
				document.querySelector(`header nav a[href*=${id}]`)?.classList.add('ativo');
			}
		});
		cabecalho?.classList.toggle('rolagem-ativa', topo > 50);
	};
});