// Get
document.getElementById("load-data").addEventListener("click", function () {
    fetch("https://script.google.com/macros/s/AKfycbxSgOGkWd4KnGSuqyko4VvREvqGlJZWNdH9AhohmvSoIAbdoN5szTGdBum7L4sMjvwf/exec")
        .then(response => response.json())
        .then(data => {
            const tableHead = document.querySelector("#data-table thead");
            const tableBody = document.querySelector("#data-table tbody");

            // Limpa cabeçalhos e linhas existentes
            tableHead.innerHTML = "";
            tableBody.innerHTML = "";

            // Define cabeçalhos da tabela personalizados
            const headerTitles = ["Data", "Nome", "Convidado do", "Presença", "Mensagem"];
            const headerRow = document.createElement("tr");
            headerTitles.forEach(title => {
                const th = document.createElement("th");
                th.textContent = title;
                headerRow.appendChild(th);
            });
            tableHead.appendChild(headerRow);

            // Adiciona as linhas de dados
            data.slice(1).forEach(row => {
                const tr = document.createElement("tr");

                // Formata a data
                const date = new Date(row[0]);
                const formattedDate = formatDate(date);

                // Adiciona as células
                const cells = [formattedDate, ...row.slice(1)];
                cells.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            document.querySelector("#data-table tbody").innerHTML = "Ocorreu um erro: " + error.message;
        });
});

// Função para verificar se os dados já existem
function checkDuplicate(data, newData) {
    return data.some(row => {
        return row[0] === newData.date &&  // Verifica a data
               row[1] === newData.name &&  // Verifica o nome
               row[2] === newData.guestOf && // Verifica o "Convidado do"
               row[3] === newData.attendance && // Verifica a presença
               row[4] === newData.message; // Verifica a mensagem
    });
}

// Exemplo de função de envio de dados com verificação
function sendData(newData) {
    fetch("https://script.google.com/macros/s/AKfycbxSgOGkWd4KnGSuqyko4VvREvqGlJZWNdH9AhohmvSoIAbdoN5szTGdBum7L4sMjvwf/exec")
        .then(response => response.json())
        .then(data => {
            if (checkDuplicate(data.slice(1), newData)) {
                if (confirm("Esses dados já foram cadastrados anteriormente. Deseja continuar?")) {
                    // Código para processar o envio mesmo que os dados sejam duplicados
                    console.log("Dados enviados mesmo duplicados.");
                } else {
                    console.log("Envio cancelado.");
                }
            } else {
                // Código para enviar novos dados se não forem duplicados
                console.log("Enviando dados novos...");
            }
        })
        .catch(error => {
            console.log("Ocorreu um erro: " + error.message);
        });
}

// Função de formatação de data
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

/*
// Exemplo de como enviar dados
document.getElementById("submit-data").addEventListener("click", function () {
    const newData = {
        date: "10/10/2024 12:00:00",  // Substitua pelos dados que quer enviar
        name: "Paulo",
        guestOf: "João",
        attendance: "Sim",
        message: "Estou feliz em participar!"
    };
    
    sendData(newData);
});
*/