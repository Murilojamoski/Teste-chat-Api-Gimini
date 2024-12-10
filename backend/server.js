import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI("AIzaSyBmlXyYDYcXSw4b_aQQvIU93oO681E3GbA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Oi Ernestro, quem é você?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Oi! Eu sou o Ernestro, seu mascote virtual. Estou aqui para te ajudar com dicas de exercícios personalizados, baseados nos seus gostos e na sua rotina! 😊",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Para começar, você pode me contar: Qual é o seu exercício favorito ou o tipo de atividade física que você mais gosta?",
          },
        ],
      },
    ],
  });


  app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
  
    try {
      const result = await chat.sendMessage(userMessage);
      res.json({ response: result.response.text() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ response: "Erro ao processar a mensagem." });
    }
  });
  
  app.listen(5050, () => console.log("Servidor rodando na porta 5050"));
