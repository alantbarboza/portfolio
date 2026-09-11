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
	
	const campoBusca = document.querySelector('#busca-projetos');
	const resultadoBusca = document.querySelector('#resultado-busca');
	const projetos = document.querySelectorAll('.projetos-box');
	const filtrosLinguagens = document.querySelector('#filtros-linguagens');
	let filtroLinguagemAtual = 'todos';

	const linguagensConfiguradas = {
		python: {
			nome: 'Python',
			icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
		},

		javascript: {
			nome: 'JavaScript',
			icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
		},

		typescript: {
			nome: 'TypeScript',
			icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
		},

		html: {
			nome: 'HTML',
			icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
		},

		css: {
			nome: 'CSS',
			icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
		}
	};

	const linguagensEncontradas = new Set();

	projetos.forEach(projeto => {
		const tags = projeto.querySelectorAll('.tag-tecnologia');

		tags.forEach(tag => {
			const tecnologia = tag.textContent.trim().toLowerCase();

			if (linguagensConfiguradas[tecnologia]) {
				linguagensEncontradas.add(tecnologia);
			}
		});
	});

	if (filtrosLinguagens) {
		const botaoTodas = document.createElement('button');

		botaoTodas.type = 'button';
		botaoTodas.className = 'filtro-linguagem ativo';
		botaoTodas.dataset.linguagem = 'todos';

		botaoTodas.innerHTML = `
			<i class="bi bi-grid-3x3-gap"></i>
			<span>Todas</span>
		`;

		filtrosLinguagens.appendChild(botaoTodas);

		linguagensEncontradas.forEach(linguagem => {
			const configuracao = linguagensConfiguradas[linguagem];
			const botao = document.createElement('button');

			botao.type = 'button';
			botao.className = 'filtro-linguagem';
			botao.dataset.linguagem = linguagem;

			botao.innerHTML = `
				<img src="${configuracao.icone}" alt="${configuracao.nome}">
				<span>${configuracao.nome}</span>
			`;

			filtrosLinguagens.appendChild(botao);
		});
	}

	function filtrarProjetos() {
		const busca = campoBusca?.value.trim().toLowerCase() || '';

		let encontrados = 0;

		projetos.forEach(projeto => {
			const titulo = projeto.querySelector('h3')?.textContent.toLowerCase() || '';

			const tecnologias = Array.from(
				projeto.querySelectorAll('.tag-tecnologia')
			).map(tag =>
				tag.textContent.trim().toLowerCase()
			);

			const correspondeLinguagem =
				filtroLinguagemAtual === 'todos' ||
				tecnologias.includes(filtroLinguagemAtual);

			const correspondeBusca =
				busca === '' ||
				titulo.includes(busca) ||
				tecnologias.some(tecnologia =>
					tecnologia === busca
				);

			if (correspondeLinguagem && correspondeBusca) {
				projeto.style.display = '';
				encontrados++;
			} else {
				projeto.style.display = 'none';
			}
		});

		if (busca === '' && filtroLinguagemAtual === 'todos') {
			resultadoBusca.textContent = 'Todos os projetos';

		} else if (encontrados === 0) {
			resultadoBusca.textContent = 'Nenhum projeto encontrado';

		} else {
			resultadoBusca.textContent =
				encontrados === 1
					? '1 projeto encontrado'
					: `${encontrados} projetos encontrados`;

		}
	}

	if (campoBusca) {
		campoBusca.addEventListener('input', filtrarProjetos);
	}

	if (filtrosLinguagens) {
		filtrosLinguagens.addEventListener('click', evento => {
			const botao = evento.target.closest('.filtro-linguagem');

			if (!botao) return;

			filtroLinguagemAtual = botao.dataset.linguagem;

			filtrosLinguagens
				.querySelectorAll('.filtro-linguagem')
				.forEach(botao => {
					botao.classList.remove('ativo');
				});

			botao.classList.add('ativo');
			filtrarProjetos();
		});
	}
});