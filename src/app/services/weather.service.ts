import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries = [
    {country:'Singapore', city:'Singapore'},
    {country:'Malaysia', city:'Kuala Lumpur'},
    {country:'United Kingdom', city:'London'},
    {country:'China', city:'Beijing'},
    {country:'Japan', city:'Tokyo'}
  ]

  imageBasedCity = [
    {city: 'Singapore', imageUrl: ''},
    {city: 'Kuala Lumpur', imageUrl: ''},
    {city: 'London', imageUrl: ''},
    {city: 'Beijing', imageUrl: ''},
    {city: 'Tokyo', imageUrl: ''}
  ]

  constructor(private httpClient: HttpClient) { }

  getWeather(city: string, apiKey: string){
    const params = new HttpParams()
                    .set('q', city)
                    .set('appid', apiKey)
    return lastValueFrom(this.httpClient.get
              ('https://api.openweathermap.org/data/2.5/weather', {params: params}))
  } 
  
}
