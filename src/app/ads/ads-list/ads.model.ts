export class AdModel {
  public ID : number
  public Brand : string
  public CarModel : string
  public Ad_url : string
  public Prices : Price[] | null
  public Market : Market

  constructor(
    ID : number,
    Brand : string,
    CarModel : string,
    Ad_url : string,
    Prices : Price[] | null,
    Market : Market
  ) {
    this.ID = ID
    this.Brand = Brand
    this.CarModel = CarModel
    this.Ad_url = Ad_url
    this.Prices = Prices
    this.Market = Market

  }
}

export class Price {
  public ID : number
  public Price : number
  public CreatedAt : string

  constructor( ID : number , Price : number, CreatedAt : string
  ) {
    this.ID = ID
    this.Price = Price
    this.CreatedAt = CreatedAt
  }
}

export class Market {
  public ID : number
  public Name : string

  constructor(ID : number, Name : string) {
    this.ID = ID
    this.Name = Name

  }
}
