class Logger
{
  constructor(elementID)
  {
    this._$element = $("#" + elementID);
    this.init();
  }

  init()
  {
    this._$element.append($("<ul>"));
  }

  log(text)
  {
    let time = new Date();
    this._$element.children("ul").append(`<li>${text} <span class="timestamp">${time.toLocaleTimeString()}</span></li>`);
    this._$element.scrollTop(1e9);
  }
}
