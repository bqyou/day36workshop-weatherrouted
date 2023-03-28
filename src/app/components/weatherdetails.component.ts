import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../model/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy {

  OPENWEATHER_API_KEY= 'd2c10dba6e897642d5f2d6346712e749';
  private city: string = "Singapore";
  private country?: string;
  private imageUrl?: string;
  params$ ! : Subscription;
  model = new Weather("Singapore", 0,0,0,"", 0,0);

  constructor(private weatherSvc: WeatherService, private router:Router,
      private activatedRoute: ActivatedRoute)
  {}

  ngOnInit(): void {
      this.params$ = this.activatedRoute.params.subscribe(
        (params) => {
          this.city = params['city'];
        }
      );
      this.getWeatherFromAPI(this.city);
  }

  ngOnDestroy(){
    this.params$.unsubscribe();
  }

  getWeatherFromAPI(city: string){
    this.weatherSvc.getWeather(city, this.OPENWEATHER_API_KEY)
      .then((result) => {  
        const cityObj = this.weatherSvc.getCityUrl(city);
        console.log(cityObj?.imageUrl);
        this.model = new Weather(
          city,
          ('main' in result) ? (result.main as { temp: number }).temp : 0,
          ('main' in result) ? (result.main as { pressure: number }).pressure : 0,
          ('main' in result) ? (result.main as { humidity: number }).humidity : 0,
          ('weather' in result) ? (result.weather as { description: string }[])[0].description : '',
          ('wind' in result) ? (result.wind as { degree: number }).degree : 0,
          ('wind' in result) ? (result.wind as { speed: number }).speed : 0,
        )
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate([''])
      })
  }
  
  
  

}
