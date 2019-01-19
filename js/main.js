let deck;
let deckElement = document.getElementById("deck-played");

function newDeck()
{
  deck = new Deck(starterDeck);
  deckElement.innerHTML = "<img src='assets/back.jpg'/>";
}

function draw()
{
  if (!deck) return;
  var card = deck.draw();
  deckElement.innerHTML = "<img src=" + card.img + "/>";
}

function shuffle()
{
  newDeck();
  deck.shuffle();
}

shuffle();
