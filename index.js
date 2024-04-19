import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

import Mesa from './Mesa.js'
import Jogador from './Jogador.js'

var mesa = new Mesa()

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'teste.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log('&spades;')
  let jogador = new Jogador ('Filipe')
  var rodada = []
  mesa.setJogador(jogador)
  for (let i = 0; i < 3; i++) {
    mesa.setJogador(new Jogador (`bot${i}`))
  }
  mesa.distribuirCartas()
  socket.emit('entrou', mesa)
  socket.on('disconnect', () => {
    mesa = new Mesa()
    rodada = []
    console.log('user disconnected');
  });
  socket.on('jogou', (jogador, valor, naipe) => {
    // console.log(`${jogador} jogou ${valor}. ${rodada.length} cartas descartadas.`)
    // console.log(rodada)
    if (rodada.length == 0) {
      rodada.push(jogador, valor, naipe)
    } else {

      // let ordem = ['3', '2', '1', '13', '12', '11', '4']
      let ordem = ['3', '2', 'A', 'K', 'Q', 'J', '4']
      if (ordem.indexOf(valor) < ordem.indexOf(rodada[1])) {
        rodada = [jogador, valor, naipe]
      }
    }
    socket.emit('resultado', `${rodada[0]} fez com ${rodada[1]} de ${rodada[2]}`)
    if (jogador == 'jogador') rodada = []
    // socket.emit('resultado', rodada)
    console.log(rodada)
  })
});

// compararValores(valor1, valor2) {
//   if (ordem.indexOf(valor1) > ordem.indexOf) {
//     return 
//   }
// }

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});