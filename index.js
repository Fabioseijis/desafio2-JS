const limparForm = () => {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

const buscarCep = (endereco) => {
    if (!("erro" in endereco)) {
        document.getElementById('rua').value=(endereco.logradouro);
        document.getElementById('bairro').value=(endereco.bairro);
        document.getElementById('cidade').value=(endereco.localidade);
        document.getElementById('uf').value=(endereco.uf);
        document.getElementById('ibge').value=(endereco.ibge);
    } 
    else {
        limparForm();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(el) {

    const cep = el.replace(/\D/g, '');

    if (cep != "") {

        const validacaoDoCep = /^[0-9]{8}$/;

        if(validacaoDoCep.test(cep)) {

            const script = document.createElement('script');

            const URL = `https://viacep.com.br/ws/${cep}/json/`;

            document.body.appendChild(script);

            fetch(URL).then(function(response) {
                response.json().then((data) => {
                    const endereco = data
                    buscarCep(endereco)
                });
            }).catch((err) => {
                console.error('erro', err);
            });

        } 
        else {
            limparForm();
            alert("Este CEP não está no nosso registro");
        }
    }
    else {
        limparForm();
    }
};