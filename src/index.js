import React from 'react';// Importa a biblioteca React para a construção de interfaces de usuário
import ReactDOM from 'react-dom/client';// Importa o módulo ReactDOM do cliente para renderizar os componentes React no navegador
import './index.css';// Importa o arquivo CSS para estilização da aplicação
import App from './App';// Importa o componente principal da aplicação, geralmente localizado em App.js
import reportWebVitals from './reportWebVitals';// Importa a função para relatar as métricas de desempenho da aplicação

const root = ReactDOM.createRoot(document.getElementById('root'));// Cria uma raiz de renderização ReactDOM associada ao elemento com id 'root' no DOM
root.render(// Renderiza o componente principal da aplicação dentro da raiz de renderização
  <React.StrictMode> 
    <App /> 
  </React.StrictMode>/// Componente para ativar o "modo estrito" do React, que executa verificações adicionais e avisos para ajudar a escrever códigos mais seguros
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();// Chama a função para relatar as métricas de desempenho da aplicação