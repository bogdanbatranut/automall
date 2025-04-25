import {CriteriaModel} from "../criterias/criterias.model";

export class Session {
  public ID : number
  public CreatedAt : Date
  public SessionID : string
  public CriteriaLogs! : CriteriaLog[]

  constructor(ID : number, CreatedAt : Date, SessionID : string, CriteriaLogs : CriteriaLog[]) {
    this.ID = ID
    this.CreatedAt = CreatedAt
    this.SessionID = SessionID
    if (CriteriaLogs !== null) {
      this.CriteriaLogs = CriteriaLogs
    }
  }
}

export class CriteriaLog {
  public ID : number
  public SessionID : string
  public JobID : string
  public CreatedAt : Date
  public UpdatedAt : Date
  public CriteriaID : number
  public MarketID : number
  public Brand : string
  public CarModel : string
  public MarketName : string
  public NumberOfAds : number
  public Success : boolean
  public Finished : boolean
  public PageLogs : PageLog[]
  public Fuel : string

  constructor(ID : number, SessionID : string, JobID : string, CreatedAt : Date , UpdatedAt : Date, CriteriaID : number, MarketID : number, Brand : string, CarModel : string, MarketName : string, NumberOfAds : number, Success : boolean, Finished : boolean, PageLogs : PageLog[] , Fuel : string) {
    this.ID = ID
    this.SessionID = SessionID
    this.JobID = JobID
    this.CreatedAt = CreatedAt
    this.UpdatedAt = UpdatedAt
    this.CriteriaID = CriteriaID
    this.MarketID = MarketID
    this.Brand = Brand
    this.CarModel = CarModel
    this.MarketName = MarketName
    this.NumberOfAds = NumberOfAds
    this.Success = Success
    this.Finished = Finished
    this.PageLogs = PageLogs
    this.Fuel = Fuel
  }

}

export class PageLog {
  public ID : number
  public SessionID : string
  public JobID : string
  public CreatedAt : Date
  public VisitURL : string
  public MarketID : number
  public Brand : string
  public CarModel : string
  public MarketName : string
  public NumberOfAds : number
  public PageNumber : number
  public IsLastPage : boolean
  public Error : string
  public Scraped : boolean
  public Consumed : boolean
  public CriteriaLog : CriteriaLog

  constructor(ID : number, SessionID: string, JobID: string, CreatedAt : Date ,VisitURL : string,  MarketID : number, Brand : string, CarModel : string, MarketName : string, NumberOfAds : number, PageNumber : number, IsLastPage : boolean, Error : string, Scraped : boolean, Consumed : boolean, CriterialLog : CriteriaLog ) {
    this.ID = ID
    this.SessionID = SessionID
    this.JobID = JobID
    this.CreatedAt = CreatedAt
    this.VisitURL = VisitURL
    this.MarketID = MarketID
    this.Brand = Brand
    this.CarModel = CarModel
    this.MarketName = MarketName
    this.NumberOfAds = NumberOfAds
    this.PageNumber = PageNumber
    this.IsLastPage = IsLastPage
    this.Error = Error
    this.Scraped = Scraped
    this.Consumed = Consumed
    this.CriteriaLog = CriterialLog
  }

  toSessionJob( allowPageIncrement : boolean): SessionJob {
      let market = new Market(this.MarketName, this.PageNumber)
      let criteria = new CriteriaModel(
        this.CriteriaLog.CriteriaID,
        this.Brand,
        this.CarModel,
        2019,
        2024,
        0,
        125000,
        true,
        this.CriteriaLog.Fuel
      )
      let job = new SessionJob(
        this.SessionID,
        this.JobID,
        this.CriteriaLog.CriteriaID,
        this.MarketID,
        criteria,
        market,
        allowPageIncrement
      )
    return job
  }
}



export class MarketWithCriterias {
  public MarketName : string
  public ID : number
  public CriteriaLogs : CriteriaLog[] = []

  public ResultsCount : number = 0

  constructor(ID : number, MarketName : string) {
    this.ID = ID
    this.MarketName = MarketName
  }

  addCriteriaLog(cl: CriteriaLog) : void{
    this.CriteriaLogs.push(cl)
  }
}

export class SessionJob {
  public SessionID : string
  public JobID : string
  public CriteriaID : number
  public MarketID : number
  public Criteria : CriteriaModel
  public Market  : Market
  public AllowIncrementPage : boolean

  constructor(SessionID: string, JobID: string, CriteriaID: number, MarketID : number, Criteria : CriteriaModel, Market : Market, AllowIncrementPage : boolean) {
    this.SessionID= SessionID
    this.JobID = JobID
    this.CriteriaID = CriteriaID
    this.MarketID = MarketID
    this.Criteria = Criteria
    this.Market = Market
    this.AllowIncrementPage = AllowIncrementPage
  }

}

// type Criteria struct {
//   Brand    string
//   CarModel string
//   YearFrom *int
//   YearTo   *int
//   Fuel     string
//   KmFrom   *int
//   KmTo     *int
// }

export class  Market  {
  public Name : string
  public PageNumber : number

  constructor(Name : string, PageNumber : number) {
    this.Name = Name
    this.PageNumber = PageNumber
  }
}
