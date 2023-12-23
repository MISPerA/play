document.addEventListener('DOMContentLoaded', function () {
    // URL do seu arquivo TXT no GitHub
    var githubUser = 'MISPerA';
    var githubRepo = 'msg';
    var githubPath = 'Playlist%20Evangelistica%20Projeto%20Habacuque%2022.txt'; // Substitua os espaços por %20
    var txtUrl = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/main/${githubPath}`;

    // Obtém os links do arquivo TXT
    function getLinks() {
        return new Promise(function (resolve, reject) {
            fetch(txtUrl)
                .then(response => response.text())
                .then(data => {
                    // Divide os links por quebras de linha
                    var links = data.split('\n').map(link => link.trim()).filter(link => link !== '');
                    if (links.length === 0) {
                        reject('Nenhum link disponível no arquivo TXT.');
                    } else {
                        resolve(links);
                    }
                })
                .catch(error => reject(error));
        });
    }

    // Seleciona aleatoriamente um link
    function getRandomLink(links) {
        var randomIndex = Math.floor(Math.random() * links.length);
        return links[randomIndex];
    }

    // Redireciona para o link aleatório
    function redirectToRandomLink() {
        getLinks().then(function (links) {
            var randomLink = getRandomLink(links);
            console.log('Link redirecionado:', randomLink);
            window.location.href = randomLink;
        }).catch(function (error) {
            console.error('Erro ao obter links do arquivo TXT:', error);
        });
    }

    // Chama a função ao carregar a página
    redirectToRandomLink();
});
