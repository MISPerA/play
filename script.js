var player;
var countdownInterval;

// Função chamada quando a API do YouTube estiver pronta
function onYouTubeIframeAPIReady() {
    // Criação do objeto do player
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'gglkHLTS9Ao', // ID do vídeo do YouTube
        events: {
            'onReady': onPlayerReady, // Função chamada quando o player estiver pronto
            'onStateChange': onPlayerStateChange // Função chamada quando o estado do player muda
        }
    });
}

// Função chamada quando o player estiver pronto
function onPlayerReady(event) {
    // Mostra a mensagem inicial
    document.getElementById('overlay').classList.add('fade-out');

    // Inicia a reprodução do vídeo
    event.target.playVideo();
}

// Função chamada quando o estado do player muda
function onPlayerStateChange(event) {
    // Verifica se o estado do player é 1 (reproduzindo)
    if (event.data == YT.PlayerState.PLAYING) {
        // Inicia o contador regressivo
        iniciarContadorRegressivo();
    }
}

// Função para iniciar o contador regressivo
function iniciarContadorRegressivo() {
    var tempoRestante = 90; // 90 segundos

    // Exibe a barra de progresso
    document.getElementById('progress-bar').style.display = 'block';

    // Atualiza o texto do contador
    atualizarContador(tempoRestante);

    // Atualiza o progresso da barra a cada segundo
    countdownInterval = setInterval(function () {
        tempoRestante--;

        if (tempoRestante >= 0) {
            atualizarContador(tempoRestante);
        } else {
            // Para o intervalo quando o tempo acabar
            clearInterval(countdownInterval);

            // Chama a função de redirecionamento
            redirecionarAleatoriamente();
        }
    }, 1000);
}

// Função para atualizar o contador na tela
function atualizarContador(tempoRestante) {
    document.getElementById('countdown').innerHTML = `Aguarde, você será redirecionado após esse vídeo acabar em ${tempoRestante} segundos`;

    // Atualiza o progresso da barra
    var progresso = (90 - tempoRestante) / 90 * 100;
    document.getElementById('progress-indicator').style.width = progresso + '%';
}

// Função para redirecionar aleatoriamente
function redirecionarAleatoriamente() {
    // Variáveis do GitHub
    var githubUser = 'MISPerA';
    var githubRepo = 'play';
    var githubPath = 'Playlist Evangelística Projeto Habacuque 22.txt';
    var csvUrl = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/main/${githubPath}`;

    // Função para obter e processar os links
    async function obterLinks() {
        try {
            // Obter o conteúdo do arquivo de texto no GitHub
            var response = await fetch(csvUrl);
            var data = await response.text();

            // Separar o conteúdo por quebras de linha para obter os links
            var links = data.split('\n').filter(link => link.trim() !== '');

            // Chamar a função de redirecionamento com os links obtidos
            redirecionarParaLinkAleatorio(links);
        } catch (error) {
            console.error('Erro ao obter os links:', error);
        }
    }

    // Função para redirecionar para um link aleatório
    function redirecionarParaLinkAleatorio(links) {
        // Gere um número aleatório entre 0 e o número de links - 1
        var indiceAleatorio = Math.floor(Math.random() * links.length);

        // Redirecione para o link selecionado aleatoriamente
        window.location.href = links[indiceAleatorio];
    }

    // Chame a função de obterLinks para iniciar o processo
    obterLinks();
}
