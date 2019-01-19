class Deck
{
  constructor(array) {
    var deck = [];
    array.forEach(function(img) {
      deck.push(new Card(img));
    });

    this._deck = deck;
  }
  get length()
  {
    return this._deck.length;
  }

  shuffle()
  {
  	let indexToSwap;
  	let valueToSwap;
  	let length = this.length;
  	let shuffledDeck = this._deck.slice();


  	while (length) {
  		indexToSwap = Math.floor(Math.random() * length--);
  		valueToSwap = shuffledDeck[length];
  		shuffledDeck[length] = shuffledDeck[indexToSwap];
  		shuffledDeck[indexToSwap] = valueToSwap;
  	}

  	this._deck = shuffledDeck;
  }

  draw()
  {
      return this._deck.pop();
  }

  toString()
  {
    console.dir(this._deck);
  }
}

class Card
{
  constructor(img)
  {
    this.img = "assets\\" + img + ".jpg";
  }
}
