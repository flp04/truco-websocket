export default class Carta {
  constructor (valor, naipe) {
    this.valor = valor
    this.naipe = naipe
  }  
  
  static criarBaralho () {
    let cartas = []
    for (let i = 1; i <= 13; i++) {
      for (let j = 0; j < 4; j++) {
        let carta = new Carta(i, j)
        cartas.push(carta)
      }
    }
    return cartas
  }

  static criarBaralhoTrucoLimpo () {
    let cartas = Carta.criarBaralho()
    return cartas.filter(el => ![5,6,7,8,9,10].includes(el.valor))
  }
}