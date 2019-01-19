class DeckService
{
  constructor()
  {
    this._deck = null;
    this._subscribers = [];
  }

  get deck()
  {
    return this._deck;
  }

  set deck(deck)
  {
    this._deck = deck;
    this.triggerDeckChanged();
  }

  triggerDeckChanged()
  {
    this._subscribers.forEach(function(callback)
    {
      callback(this.deck)
    }, this);
  }

  onDeckChange(fn)
  {
    this._subscribers.push(fn);
  }
}
