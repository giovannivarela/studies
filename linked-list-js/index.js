const assert = require('assert/strict');

class Node {
  #element;
  #next;

  constructor(element){
    this.#element = element;
    this.#next = null;
  }

  printElement() {
    console.log(this.#element);
  }

  getElement(){
    return this.#element;
  }

  getNext(){
    return this.#next;
  }

  setNext(node){
    this.#next = node;
  }
}

class LinkedList {
  #length;
  #head;

  constructor(){
    this.#length = 0;
    this.#head = null;
  }

  append(element){
    let node = new Node(element);
    let current;

    if(this.#head == null){
      this.#head = node;
    } else {
      current = this.#head;

      while(current.getNext()){
        current = current.getNext();
      }

      current.setNext(node);
    }

    this.#length++;
  }

  insert(position, element){
    if(this.#head == null)
      throw new Error("Empty list.")

    if(position < 0 || position > this.#length)
      throw new Error("Out of bounds.");
    
    let node = new Node(element);
    let current = this.#head;
    let previous = this.#head;
    let internalPosition = 0;

    do {
      if(position == internalPosition){
        node.setNext(current);
        previous.setNext(node)
        this.#length++;

        break;
      }

      internalPosition++;
      previous = current;
      current = current.getNext();
    } while(current.getNext())
  }

  removeAt(position){
    if(this.#head == null)
      throw new Error("Empty list.")
    let current = this.#head;
    let previous = this.#head;
    let internalPosition = 0;

    if(position == 0){
      this.#head = current.getNext();
    }

    while(current.getNext()){
      if(position == internalPosition){
        previous.setNext(current.getNext())
        this.#length--;

        break;
      }

      previous = current;
      current = current.getNext();
      internalPosition++;
    }
  }

  remove(element){
    if(this.#head == null)
      throw new Error("Empty list.")

    let current = this.#head;
    let previous = this.#head;
    let position = 0;

    do {
      try {
        assert.deepStrictEqual(current.getElement(), element);
        
        position == 0 ? this.#head = current.getNext() : previous.setNext(current.getNext())
        this.#length--;

        break;
      } catch(e) {
        if(e.code !== 'ERR_ASSERTION')
          throw new Error(e)
      }

      previous = current;
      current = current.getNext();
      
      position++;
    } while(current.getNext());
  }

  pop(){
    if(this.#head == null)
      throw new Error("Empty list.")

    this.#head = this.#head.next;
    this.#length--;
  }

  indexOf(element){
    let current = this.#head;
    let position = 0;

    while(current.getNext()){
      try {
        assert.deepStrictEqual(current.getNext(), element);
        break;
      } catch(e) {
        if(e.code !== 'ERR_ASSERTION')
          throw new Error(e)
      }

      current = current.getNext();
      position++;  
    }

    return position;
  }

  isEmpty(){
    return this.#length == 0
  }

  size(){
    return this.#length
  }

  print(){
    let current = this.#head;
    if(this.#head == null)
      throw new Error("Empty list.")

    while(current.getNext()){
      current.printElement();  
      current = current.getNext();
    }

    current.printElement();
  }
}

let linkedList = new LinkedList();

linkedList.append(15);
linkedList.append(18);
linkedList.append(34);
linkedList.append(56);
linkedList.append({teste: 'teste'});
linkedList.insert(2, 22);
console.log('-----------------------------------------');
linkedList.print();
linkedList.remove(15);
console.log('-----------------------------------------');
linkedList.print();
linkedList.removeAt(2);
console.log('-----------------------------------------');
linkedList.print();
console.log("---------------------------------")
console.log(linkedList.indexOf({teste: 'teste'}));