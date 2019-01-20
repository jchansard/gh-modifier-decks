let deckService = new DeckService();
let logger = new Logger("log");
let deckController = new DeckController(deckService, logger);
let loadingController = new LoadingController(savedDecks, deckService, logger);

// load images when ready
$(document).ready(function()
{
  let preloadImg;
  Object.keys(CardDictionary).forEach(function(key)
  {
    preloadImg = new Image();
    preloadImg.src = CardDictionary[key].img;
  });
})
