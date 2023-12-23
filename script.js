document.addEventListener('DOMContentLoaded', function () {
    // URL do seu arquivo CSV no GitHub
    var githubUser = 'MISPerA';
    var githubRepo = 'play';
    var githubPath = 'Playlist Evangelística Projeto Habacuque 22.txt';
    var csvUrl = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/main/${githubPath}`;

    // Obtém as mensagens do arquivo CSV
    function getMessages() {
        return new Promise(function (resolve, reject) {
            Papa.parse(csvUrl, {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: function (result) {
                    if (result.errors.length > 0) {
                        reject(result.errors);
                    } else {
                        resolve(result.data.map(row => row.Mensagens).filter(msg => msg !== undefined));
                    }
                }
            });
        });
    }

    // Seleciona aleatoriamente uma mensagem
    function getRandomMessage(messages) {
        var randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    // Atualiza a mensagem na página
    function updateMessage() {
        var randomMessageElement = document.getElementById('randomMessage');

        // Obtém as mensagens do arquivo CSV e atualiza a página
        getMessages().then(function (messages) {
            var randomMessage = getRandomMessage(messages);
            randomMessageElement.innerHTML = randomMessage || 'Nenhuma mensagem disponível.';
            console.log('Mensagem atualizada:', randomMessage);
        }).catch(function (error) {
            console.error('Erro ao obter mensagens do arquivo CSV:', error);
        });
    }

    // Chama a função ao carregar a página
    updateMessage();
});

document.addEventListener('DOMContentLoaded', function () {

    // Função para iniciar a experiência quando o usuário clicar
    function startExperience() {
        var overlay = document.getElementById('overlay');
        var audio = document.getElementById('backgroundAudio');
        
        // Adiciona a classe fade-out para a animação de desaparecimento
        overlay.classList.add('fade-out');

        // Inicia a música
        audio.play();

        // Adiciona a animação de abertura à carta
        document.querySelector('.card').classList.add('open-animation');
    }

    // Adiciona um ouvinte de evento ao botão
    var startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startExperience);

});

document.addEventListener('DOMContentLoaded', function () {
    var messageElement = document.getElementById('randomMessage');
    var messageText = messageElement.innerText;
    var index = 0;

    function typeWriter() {
        if (index < messageText.length) {
            messageElement.innerHTML += messageText.charAt(index);
            index++;
            setTimeout(typeWriter, Math.floor(Math.random() * 150) + 50); // Adiciona um atraso aleatório
        }
    }

    typeWriter();
});
