export class CriteriaModel {
  public ID : number
  public brand : string
  public carModel : string
  public yearFrom : number
  public yearTo : number
  public kmFrom : number
  public kmTo : number

  constructor(  ID : number,
   brand : string,
   carModel : string,
   yearFrom : number,
   yearTo : number,
   kmFrom : number,
   kmTo : number) {
    this.ID = ID
    this.brand = brand
    this.carModel = carModel
    this.yearFrom = yearFrom
    this.yearTo = yearTo
    this.kmFrom = kmFrom
    this.kmTo = kmTo
  }
}
