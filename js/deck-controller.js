class DeckController
{
  constructor(deckService, logger)
  {
    this._playedDeck = new Deck();
    this._inPlayDeck = new Deck();
    this._drawDeck = new Deck();
    this._$cardsInPlayElement = null;
    this._logger = logger;
    this.init();
  }

  init()
  {
    this._$cardsInPlayElement = $("#deck-in-play");
    this._$logElement = $("#log");
    $("button#draw-one,#deck-in-play").on("click touch", this._handleDraw.bind(this));
    $("button#draw-two").on("click touch", this._handleDrawTwo.bind(this));
    $("button#shuffle").on("click touch", this._handleShuffle.bind(this));
    $("button#add-blessing").on("click touch", this._handleAddBlessing.bind(this));
    $("button#add-curse").on("click touch", this._handleAddCurse.bind(this));

    deckService.onDeckChange(this._updateDeck.bind(this));
  }

  _updateDeck(newDeck)
  {
    this._drawDeck = newDeck.shuffle();
    this._playedDeck = new Deck();
    this._$cardsInPlayElement.html("<img src='assets/back.jpg'/>");
  }

  _handleDraw()
  {
    this._drawNewCards(1);
  }

  _handleDrawTwo()
  {
    this._drawNewCards(2);
  }

  _handleShuffle()
  {
    // move cards in play to played, and then shuffle all cards
    this._playedDeck.addDeck(this._inPlayDeck);
    this._resetDrawDeck(true);
    this._$cardsInPlayElement.html("<img src='assets/back.jpg'/>");
  }

  _handleAddBlessing()
  {
    this._addToDrawDeckAndShuffle(new Card(CardDictionary.blessing));
  }

  _handleAddCurse()
  {
    this._addToDrawDeckAndShuffle(new Card(CardDictionary.curse));
  }

  _drawNewCards(numCards)
  {
    // clear out cards in play, adding them to played deck
    this._discardInPlayCards();

    for (var i = 0; i < numCards; i++)
    {
      // draw from draw deck, shuffling if it's empty
      if (this._drawDeck.length == 0)
      {
        this._resetDrawDeck(true);
      }
      this._playCard(this._drawDeck.draw());
    }
  }

  _playCard(card)
  {
    this._logger.log(`Drew a ${card.name}.`);

    this._inPlayDeck.addCard(card);
    this._$cardsInPlayElement.append(`<img src="${card.img}"/>`);
  }

  _resetDrawDeck(shouldShuffle)
  {
    this._logger.log("Adding played cards to draw deck.")
    this._drawDeck.addDeck(this._playedDeck);
    if (shouldShuffle) {
      this._shuffle();
    }
    //this._$cardsInPlayElement.html("<img src='assets/back.jpg'/>");
  }

  _discardInPlayCards()
  {
    this._$cardsInPlayElement.empty();
    this._removeOneTimeCardsFromPlay()
    this._playedDeck.addDeck(this._inPlayDeck);
  }

  _removeOneTimeCardsFromPlay()
  {
    let card;
    for (var i = this._inPlayDeck.length - 1; i >= 0; i--)
    {
      card = this._inPlayDeck.getCard(i);
      console.dir(card);
      if (card.discardOnPlay)
      {
        this._logger.log(`Removing ${card.name} from deck.`)
        this._inPlayDeck.removeCard(i);
      }
    }
  }

  _addToDrawDeckAndShuffle(card)
  {
    console.dir(card);
    this._logger.log(`Adding ${card.name} to deck.`)
    this._drawDeck.addCard(card);
    this._shuffle();
  }

  _shuffle()
  {
    this._drawDeck.shuffle();
    this._logger.log("Shuffling draw deck.")
  }
}
