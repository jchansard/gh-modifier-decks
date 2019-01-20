class ImageService
{
  constructor(cardDictionary)
  {
    this._images = {}; // src: Image dictionary
    this._dictionary = cardDictionary;
    this._root = "";
    this.init();
  }

  init()
  {
    let preloadImg;
    Object.keys(this._dictionary).forEach(function(key)
    {
      let imgSrc = this._dictionary[key].img;
      preloadImg = new Image();
      preloadImg.src =  this._root + imgSrc;
      this._images[imgSrc] = preloadImg;
    }, this);
  }

  get(src, animate)
  {
    let img = this._images[src].cloneNode();
    return (animate) ? $(img).hide().on("load", function() { $(this).fadeIn(200); }) : img;
  }

}
