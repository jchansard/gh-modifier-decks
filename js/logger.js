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
    this._$element.children("ul").append(`<li>${text}</li>`);
    this._$element.scrollTop(1e9);
  }
}
