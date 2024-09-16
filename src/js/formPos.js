
// Post
function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("wedding-form");
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(text => {
        document.getElementById("form-status").textContent = text === "Success" ? "Formulário enviado com sucesso!" : "Ocorreu um erro ao enviar o formulário.";
    })
    .catch(error => {
        document.getElementById("form-status").textContent = "Ocorreu um erro: " + error.message;
    });
}
