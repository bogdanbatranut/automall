export interface AdModelResponse {
  Data : ResponseData
}

export class ResponseData {
  public Ads : AdModel[]
  public Pagination : Pagination

  constructor(Ads : AdModel[], Pagination : Pagination) {
    this.Ads = Ads
    this.Pagination = Pagination
  }
}

export class Pagination {
  public limit : number
  public page : number
  public total_rows : number
  public total_pages : number

  constructor(limit : number, page : number, total_rows : number, total_pages : number) {
    this.limit = limit
    this.page = page
    this.total_rows = total_rows
    this.total_pages = total_pages
  }
}

export class SetFollowRequest {
  public AdId : number
  public Follow : boolean

  constructor(AdId : number, Follow : boolean) {
    this.AdId = AdId
    this.Follow = Follow
  }
}

export class AdModel {

  public ID : number
  public DeletedAt : string
  public Title : string
  public Brand : string
  public CarModel : string
  public Ad_url : string
  public Prices : Price[]
  public Market : Market
  public Year : number
  public Km : number
  public Age : number
  public DiscountValue : number
  public DiscountPercent : number
  public Thumbnail : string
  public DailyDiscountAmmount : number
  public Seller : Seller
  public DealerAverageDiscount : number
  public Followed : boolean
  public Fuel : string

  constructor(
    ID : number,
    DeletedAt : string,
    Title : string,
    Brand : string,
    CarModel : string,
    Ad_url : string,
    Prices : Price[],
    Market : Market,
    Year : number,
    Km : number,
    Age : number,
    DiscountValue : number,
    DiscountPercent : number,
    Thumbnail : string,
    DailyDiscountAmmount : number,
    Seller : Seller,
    DealerAverageDiscount : number,
    Followed : boolean,
    Fuel : string
  ) {
    this.ID = ID
    this.DeletedAt = DeletedAt
    this.Title = Title
    this.Brand = Brand
    this.CarModel = CarModel
    this.Ad_url = Ad_url
    this.Prices = Prices
    this.Market = Market
    this.Year = Year
    this.Km = Km
    this.Age = Age
    this.DiscountValue = DiscountValue
    this.DiscountPercent = DiscountPercent
    this.Thumbnail = Thumbnail
    this.DailyDiscountAmmount = DailyDiscountAmmount
    this.Seller = Seller
    this.DealerAverageDiscount = DealerAverageDiscount
    this.Followed = Followed
    this.Fuel = Fuel
    // this.DiscountValue = this.Prices[0].Price - this.Prices[this.Prices.length -1].Price
    // this.DiscountPercent = (this.Prices[0].Price - this.Prices[this.Prices.length -1].Price)/this.Prices[0].Price * 100
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

export class Seller {
  public NameInMarket : string

  constructor(NameInMarket : string) {
    this.NameInMarket = NameInMarket
  }
}

