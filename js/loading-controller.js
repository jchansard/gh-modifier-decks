class LoadingController
{
  constructor(deckList, deckService)
  {
    this._deckList = deckList;
    this._deckService = deckService;
    this._$loadButtonElement = $("#load").on("click touch", this._handleLoadClicked.bind(this));
    this._$loadDialogElement = $("#load-deck");
    this.init();
  }

  init()
  {
    this._tryLoadFromCookie();
  }

  _tryLoadFromCookie()
  {
    let deckListFromCookie = document.cookie.match(new RegExp('(?:^| )deckList=([^;]+)'));
    let loadedDeck = (deckListFromCookie) ? deckListFromCookie[1] : "default";
    this._deckService.deck = new Deck(this._deckList[loadedDeck]);
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
    this._deckService.deck = new Deck(this._deckList[deckToLoad]);
  }
}
