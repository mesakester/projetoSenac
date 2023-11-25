async function validaLogin() {
    const email = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    alert(senha);

    const response = await fetch('localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&senha=${senha}`,
    });

    if (response.ok) {
        document.getElementById('mensagem').innerText = 'Login bem-sucedido';
    } else {
        document.getElementById('mensagem').innerText = 'Credenciais inválidas';
    }
}
