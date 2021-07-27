'use strict';

class Queue {
  constructor(size){
    this._size = size
    this._itens = []
    this._index = -1
  }

  enqueue(item, priority){
    this._index++;
    if(this._index == this._size)
      throw "Fila estourou"

    let added = false
    for(let i = 0; i < this._itens.length; i++){
      this._itens.splice(i, 0, {item, priority});
      added = true;
      break;
    }
    if(!added)
      this._itens.push({item, priority})
  }

  dequeue(){
    this._index--;
    if(this._index < -1)
      throw "Fila vazia"

    return this._itens.shift()
  }

  length(){
    return this._index;
  }
}

let aux = new Queue(4);
aux.enqueue("aoooo", 1);
aux.enqueue("aoooo1", 0);

try {
  let aux2 = aux.dequeue();
  console.log(aux2)
} catch(e){
  console.error(e)
}

