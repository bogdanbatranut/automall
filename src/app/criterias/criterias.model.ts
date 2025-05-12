export class CriteriaModel {
  public ID : number
  public brand : string
  public carModel : string
  public YearFrom : number
  public YearTo : number
  public KmFrom : number
  public KmTo : number
  public AllowProcess : boolean
  public Fuel : string

  constructor(
    ID : number,
   brand : string,
   carModel : string,
   yearFrom : number,
   yearTo : number,
   kmFrom : number,
   kmTo : number,
   allowProcess : boolean,
   fuel : string
  ) {
    this.ID = ID
    this.brand = brand
    this.carModel = carModel
    this.YearFrom = yearFrom
    this.YearTo = yearTo
    this.KmFrom = kmFrom
    this.KmTo = kmTo
    this.AllowProcess = allowProcess
    this.Fuel = fuel
  }
}



export class CriteriaSetupModel {
  public ID : number
  public brand : string
  public carModel : string
  public YearFrom : number
  public YearTo : number
  public KmFrom : number
  public KmTo : number
  public AllowScraping : boolean
  public Fuel : string

  constructor(
    ID : number,
    brand : string,
    carModel : string,
    yearFrom : number,
    yearTo : number,
    kmFrom : number,
    kmTo : number,
    allowScraping : boolean,
    fuel : string
  ) {
    this.ID = ID
    this.brand = brand
    this.carModel = carModel
    this.YearFrom = yearFrom
    this.YearTo = yearTo
    this.KmFrom = kmFrom
    this.KmTo = kmTo
    this.AllowScraping = allowScraping
    this.Fuel = fuel
  }
}
