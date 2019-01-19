class DeckController
{
  constructor(deckService)
  {
    this._playedDeck = new Deck();
    this._drawDeck = new Deck();
    this._$deckElement = null;
    this.init();
  }

  init()
  {
    deckService.onDeckChange(this._updateDeck.bind(this));
    this._$deckElement = $("#deck-played");
    $("button#draw,#deck-played").on("click touch", this._handleDraw.bind(this));
    $("button#shuffle").on("click touch", this._handleShuffle.bind(this));

    this._$deckElement.html("<img src='assets/back.jpg'/>");
  }

  _updateDeck(newDeck)
  {
    this._drawDeck = newDeck;
    this._playedDeck = new Deck();
    this._resetDrawDeck(true);
  }

  _handleDraw()
  {
    let card = this._drawDeck.draw();
    if (card)
    {
      this._playCard(card);
    }
    else
    {
      this._resetDrawDeck(true);
    }
  }

  _handleShuffle()
  {
    this._resetDrawDeck(true);
  }

  _playCard(card)
  {
    this._playedDeck.addCard(card);
    this._$deckElement.html(`<img src="${card.img}"/>`);
  }

  _resetDrawDeck(shouldShuffle)
  {
    this._drawDeck.addDeck(this._playedDeck);
    if (shouldShuffle) {
      this._shuffle();
    }
    this._$deckElement.html("<img src='assets/back.jpg'/>");
  }

  _shuffle()
  {
    this._drawDeck.shuffle();
  }
}
