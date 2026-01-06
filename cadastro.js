function cadastrarUsuario() {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const idade = Number (document.getElementById('age').value);
    const usuario = {
        name: nome,
        email: email,
        age: idade
    };

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Usuário cadastrado no servidor:', data);
    })
    .catch(err => console.error(err));
       console.log('Usuário cadastrado:', usuario );
}


   

const botaoCadastrar = document.querySelector('.botaoCadastrar');
botaoCadastrar.addEventListener('click', cadastrarUsuario);

