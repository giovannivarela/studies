'use strict';

class Pilha {
  constructor(tamanho) {
    this._tamanho = tamanho
    this._conteudo = []
    this._indice = -1
  }

  retornaTamanho(){
    return this._tamanho
  }

  insereConteudo(novoConteudo){
    //Esse teste seria a parte atualizada no caso de uma pilha sem tamanho definido
    if(this._indice == this._tamanho)
      throw "Estourou a pilha"

    this._indice++;
    this._conteudo[this._indice] = novoConteudo

    return "Conteudo inserido com sucesso"
  }

  retiraConteudo(){
    if(this._indice == -1)
      throw "Pilha vazia"

    this._indice--;
    let conteudoRemovido = this._conteudo.pop()
    if(conteudoRemovido == 'undefined')
      conteudoRemovido = []

    return conteudoRemovido
  }
}

let pilha = new Pilha(10)

console.log(pilha.retornaTamanho())

try {
  console.log(pilha.insereConteudo("Aooo"))
} catch(e) {
  console.log(e)
}

try {
  console.log(pilha.retiraConteudo())
} catch(e) {
  console.log(e)
}

try {
  console.log(pilha.retiraConteudo())
} catch(e) {
  console.log(e)
}
