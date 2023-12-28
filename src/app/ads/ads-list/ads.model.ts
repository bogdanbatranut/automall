export interface AdModelResponse {
  Data : AdModel[]
}

export class AdModel {
  public ID : number
  public Brand : string
  public CarModel : string
  public Ad_url : string
  public Prices : Price[]
  public Market : Market
  public Year : number
  public Km : number
  public Age : number

  constructor(
    ID : number,
    Brand : string,
    CarModel : string,
    Ad_url : string,
    Prices : Price[],
    Market : Market,
    Year : number,
    Km : number,
    Age : number,

  ) {
    this.ID = ID
    this.Brand = Brand
    this.CarModel = CarModel
    this.Ad_url = Ad_url
    this.Prices = Prices
    this.Market = Market
    this.Year = Year
    this.Km = Km
    this.Age = Age
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

