class LoadingController
{
  constructor(deckList, deckService, logger, storage)
  {
    this._deckList = deckList;
    this._deckService = deckService;
    //this._$loadButtonElement = $("#load").on("click touch", this._handleLoadClicked.bind(this));
    this._$loadDialogElement = $("#load");
    this._logger = logger;
    this._storage = storage || window.localStorage;
    this.init();
  }

  init()
  {
    this._$loadDialogElement.change(this._loadSelectedDeck.bind(this));
    this._populateList();
    this._tryLoadFromLocalStorage();
  }

  _tryLoadFromLocalStorage()
  {
    let loadedDeck = this._storage.getItem("loadedDeck");
    if (loadedDeck) {
      this._logger.log(`Loaded deck: ${loadedDeck} from localStorage.`);
      loadedDeck = this._deckList[loadedDeck];
    }
    else
    {
      this._logger.log("Loaded default deck.");
      loadedDeck = this._deckList.Default;
    }
    this._deckService.deck = new Deck(loadedDeck);
  }

  _populateList()
  {
    var $newSelection;
    Object.keys(this._deckList).forEach(function(deckList)
    {
      $newSelection = $(`<option value=${deckList}>${deckList}</option>`);
      this._$loadDialogElement.append($newSelection);
      if (deckList = this._storage.getItem("loadedDeck"))
      {
        this._$loadDialogElement.val(deckList);
      }
    }, this);
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
      });
      this._$loadDialogElement.append($newButton);
    }, this);
  }

  _loadSelectedDeck()
  {
    this._loadSavedDeck(this._$loadDialogElement.val());
  }

  _loadSavedDeck(deckToLoad)
  {
    this._logger.log(`Loaded deck: ${deckToLoad}.`);
    this._deckService.deck = new Deck(this._deckList[deckToLoad]);
    this._storage.setItem("loadedDeck", deckToLoad);
  }
}
