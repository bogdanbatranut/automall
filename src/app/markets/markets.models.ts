import {CriteriaModel, CriteriaSetupModel} from "../criterias/criterias.model";

export interface MarketsModelResponse {
  Data : Market[]
}

export interface Market {
  ID : number
  Name : string
  AllowProcess : boolean
  Criterias : CriteriaModel[]
}

export interface MarketSetupResponse {
  Data : MarketSetup[]
}

export interface MarketSetup {
  ID : number
  Name : string
  AllowProcess : boolean
  MarketCriterias : MarketCriteriasSetupModel[]
}

export interface MarketCriteriasSetupModel {
  AllowScraping : boolean
  Criteria : CriteriaSetupModel
}
