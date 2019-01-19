class LoadingController
{
  constructor(deckList, deckService, logger)
  {
    this._deckList = deckList;
    this._deckService = deckService;
    this._$loadButtonElement = $("#load").on("click touch", this._handleLoadClicked.bind(this));
    this._$loadDialogElement = $("#load-deck");
    this._logger = logger;
    this.init();
  }

  init()
  {
    this._tryLoadFromCookie();
  }

  _tryLoadFromCookie()
  {
    let deckListFromCookie = document.cookie.match(new RegExp('(?:^| )deckList=([^;]+)'));
    let loadedDeck;
    if (deckListFromCookie) {
      this._logger.log(`Loaded deck: ${deckListFromCookie[1]} from cookie.`);
      loadedDeck = this._deckList[deckListFromCookie[1]];
    }
    else
    {
      this._logger.log("Loaded default deck.")
      loadedDeck = this._deckList.default;
    }
    this._deckService.deck = new Deck(loadedDeck);
  }

  _handleLoadClicked()
  {
    var $newButton;
    let loadingController = this;
    this._$loadDialogElement.empty();

    Object.keys(this._deckList).forEach(function(deckList)
    {
      $newButton = $("<button>", {
        text: `Load ${deckList}`,
        click: function() {
          loadingController._loadSavedDeck(deckList);
        }
      })
      this._$loadDialogElement.append($newButton);
    }, this);
  }

  _loadSavedDeck(deckToLoad)
  {
    this._logger.log(`Loaded deck: ${deckToLoad}.`)
    this._deckService.deck = new Deck(this._deckList[deckToLoad]);
    document.cookie = `deckList=${deckToLoad}`;
  }
}
