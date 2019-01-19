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
    this._$element.append(`<li>${text}</li>`);
  }
}
