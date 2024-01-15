export interface MarketsModelResponse {
  Data : Market[]
}

export interface Market {
  ID : number
  Name : string
  AllowProcess : boolean
}
