class DeckController
{
  constructor(deckService, imageService, logger)
  {
    this._deckService = deckService;
    this._imageService = imageService;
    this._playedDeck = new Deck();
    this._inPlayDeck = new Deck();
    this._drawDeck = new Deck();
    this._$cardsInPlayElement = null;
    this._$cardContainerElement = null;
    this._logger = logger;
    this.init();
  }

  init()
  {
    this._$cardsInPlayElement = $("#card-play-area");
    this._$cardContainerElement = $("#card-container");
    this._$logElement = $("#log");
    $("button#draw-one,#card-play-area").on("click touch", this._handleDraw.bind(this));
    $("button#draw-two").on("click touch", this._handleDrawTwo.bind(this));
    $("button#shuffle").on("click touch", this._handleShuffle.bind(this));
    $("button#add-blessing").on("click touch", this._handleAddBlessing.bind(this));
    $("button#add-curse").on("click touch", this._handleAddCurse.bind(this));

    this._deckService.onDeckChange(this._updateDeck.bind(this));
  }

  _updateDeck(newDeck)
  {
    this._drawDeck = newDeck.shuffle();
    this._playedDeck = new Deck();
    this._inPlayDeck = new Deck();
    this._resetDrawDeck(false);

    // set the card container's minimum height so the layout stays steady when
    // loading images
    let $cardContainer = this._$cardContainerElement;
    $cardContainer.children("img").on("load", function() {
      $cardContainer.css("min-height", this.height)
    });
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
  }

  _handleAddBlessing()
  {
    this._addToDrawDeckAndShuffle(new Card(CardDictionary.blessing));
    this._modifyCounter("add-blessing", 1);
  }

  _handleAddCurse()
  {
    this._addToDrawDeckAndShuffle(new Card(CardDictionary.curse));
    this._modifyCounter("add-curse", 1);
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
    this._paintInPlayDeck();
  }

  _resetDrawDeck(shouldShuffle)
  {
    if (this._playedDeck.length > 0)
    {
      this._logger.log("Adding played cards to draw deck.")
      this._drawDeck.addDeck(this._playedDeck);
    }
    if (shouldShuffle) {
      this._shuffle();
    }
    this._paintInPlayDeck();
  }

  _discardInPlayCards()
  {
    this._$cardContainerElement.css("min-height", this._$cardContainerElement.height());
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
      if (card.discardOnPlay)
      {
        this._logger.log(`Removing ${card.name} from deck.`)
        this._inPlayDeck.removeCard(i);
        this._modifyCounter(`add-${card.name}`, -1);
      }
    }
  }

  _addToDrawDeckAndShuffle(card)
  {
    this._logger.log(`Adding ${card.name} to deck.`)
    this._drawDeck.addCard(card);
    this._shuffle();
  }

  _paintInPlayDeck()
  {
    if (this._inPlayDeck.length > 0)
    {
      this._$cardsInPlayElement.empty();
      this._inPlayDeck.forEach(function(card) {
        this._$cardsInPlayElement.append(this._imageService.get(card.img));
        this._$cardsInPlayElement.children("img").slideDown(200);
      }, this)
    }
    else
    {
      this._$cardsInPlayElement.html(`<img class="card" src="assets/back.jpg"/>`);
    }
  }

  _modifyCounter(elementID, toAdd)
  {
    let buttonHTML = $(`#${elementID}`).html();
    let countRegEx = /\((\d+)\)/;
    let counter = buttonHTML.match(countRegEx)[1];
    counter = parseInt(counter) + toAdd;
    $(`#${elementID}`).html(buttonHTML.replace(countRegEx,`(${counter})`));

  }

  _shuffle()
  {
    this._drawDeck.shuffle();
    this._logger.log("Shuffling draw deck.")
  }
}
