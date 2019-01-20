let deckService = new DeckService();
let imageService = new ImageService(CardDictionary);
let logger = new Logger("log");
let deckController = new DeckController(deckService, imageService, logger);
let loadingController = new LoadingController(savedDecks, deckService, logger);
