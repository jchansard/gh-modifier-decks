class Deck
{
  constructor(array) {
    this._deck = [];
    if (Array.isArray(array))
    {
      array.forEach(function(cardData) {
        this._deck.push(new Card(cardData));
      }, this);
    }
  }

  get length()
  {
    return this._deck.length;
  }

  getCard(index)
  {
    return this._deck[index];
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
    return this;
  }

  draw()
  {
      return this._deck.pop();
  }

  addCard(card)
  {
    this._deck.push(card);
  }

  removeCard(index)
  {
    this._deck.splice(index, 1);
  }

  addDeck(deck)
  {
    this._deck = this._deck.concat(deck.empty());
  }

  empty()
  {
    let emptiedCards = this._deck.slice();
    this._deck = [];

    return emptiedCards;
  }

  forEach(fn, thisArg)
  {
    this._deck.forEach(fn, thisArg)
  }

  toString()
  {
    console.dir(this._deck);
  }
}

class Card
{
  constructor(cardData)
  {
    this.name = cardData.name;
    this.img = cardData.img;
    this.discardOnPlay = cardData.discardOnPlay || false;
  }
}
