class Deck
{
  constructor(array) {
    this._deck = [];
    if (Array.isArray(array))
    {
      array.forEach(function(img) {
        this._deck.push(new Card(img));
      }, this);
    }
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

  addCard(card)
  {
    this._deck.push(card);
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

  toString()
  {
    console.dir(this._deck);
  }
}

class Card
{
  constructor(img)
  {
    this.img = "assets/" + img + ".jpg";
  }
}
