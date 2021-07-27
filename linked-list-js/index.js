'use strict';

class Node {
  constructor(element){
    this._element = element;
    this._next = null;
  }
}

class LinkedList {
  constructor(){
    this._length = 0;
    this._head = null;
  }

  append(element){
    let Node = new Node(element);
    let current;

    if(this._head == null){
      head = node;
    } else {
      current = this._head;

      while(current.next){
        current = current.next;
      }

      current.next = node
    }

    this._length++;
  }

  insert(position, element){}
  removeAt(position){}
  remove(element){}
  indexOf(element){}
  isEmpty(){}
  size(){}
  toString(){}
  print(){}
}
