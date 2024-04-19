import Carta from './Baralho.js'

export default class Mesa {
  constructor () {
    this.jogadores = []
    this.baralho = Carta.criarBaralhoTrucoLimpo()
    
  }

  setJogador (jogador) {
    this.jogadores.push(jogador)
  }

  embaralharCartas () {
    return this.baralho.sort(() => Math.random() - 0.5);
  }

  distribuirCartas () {
    this.embaralharCartas()
    this.jogadores.forEach(jogador => {
      for (let i = 0; i < 3; i++) {
        jogador.mao.push(this.baralho.shift())
      }
    })
  }
}