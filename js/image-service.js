class ImageService
{
  constructor(cardDictionary)
  {
    this._images = {}; // src: Image dictionary
    this._dictionary = cardDictionary;
    this.init();
  }

  init()
  {
    let preloadImg;
    Object.keys(this._dictionary).forEach(function(key)
    {
      let imgSrc = this._dictionary[key].img;
      preloadImg = new Image();
      preloadImg.src = imgSrc;
      preloadImg.style.display = "none";
      this._images[imgSrc] = preloadImg;
    }, this);
  }

  get(src)
  {
    return this._images[src].cloneNode();
  }

}
