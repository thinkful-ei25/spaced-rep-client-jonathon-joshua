'use strict';
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
  }

  push(data){
    if(this.head === null){
      this.head = new Node(data);
      this.tail = this.head;
    }
    else{
      this.tail.next = new Node(data);
      this.tail = this.tail.next;
    }
  }

  pop(){
    let temp = this.head;
    this.head = this.head.next;
    return temp;
  }

  print(){
    if(this.head === null){
      return 'head is null';
    }
    let temp = this.head;
    let string = '';
    while(temp){
      temp.next === null ? string += temp.data.esperantoWord : string += temp.data.esperantoWord + ' -> ';
      temp = temp.next;
    }
    return string;
  }
}