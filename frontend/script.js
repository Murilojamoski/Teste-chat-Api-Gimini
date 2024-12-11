const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");


function Admensagem(quem, texto) {
    const mensagem = document.createElement('div');
    mensagem.innerHTML = texto
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    mensagem.className = quem === "ia" ? "mensagemIa" : "mensagemUser";
    messagesDiv.appendChild(mensagem);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

Admensagem("ia","Oi! Eu sou o Ernestro, seu mascote virtual. Estou aqui para te ajudar com dicas de exercícios personalizados. 😊");

Admensagem("ia","Para começar, qual é o seu exercício favorito ou o tipo de atividade física que você mais gosta?");

async function SendMensagem(){
    const mensagemUser = userInput.value.trim()
    if(!mensagemUser){
        return
    }
    Admensagem('user',mensagemUser)
    userInput.value = ""
    try{
        const response = await fetch("http://localhost:5050/chat",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({message: mensagemUser}) ,
            mode:'cors'
        })

        const data = await response.json()

        Admensagem("ia",data.response)
    }
    catch(error){
        Admensagem("ia","Desculpe, algo deu errado. Tente novamente mais tarde");
        console.log(error)
    }
}

sendButton.addEventListener('click', SendMensagem)

userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      SendMensagem();
    }
  });

