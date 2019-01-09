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

  spacedRepitition(data, movement){
    if(this.head === null){
      return 'how did you possibly mess this up';
    }
    let tempNode = this.head;
    let nextNode;
    let counter = 1;
    while(tempNode.next){
      if(counter === movement){
        break;
      }
      tempNode = tempNode.next;
      counter++;
    }
    data = new Node(data);
    nextNode = tempNode.next;
    tempNode.next = data;
    data.next = nextNode;
  }
  pop(){
    if(this.head === null){
      return '';
    }
    let temp = this.head.data;
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