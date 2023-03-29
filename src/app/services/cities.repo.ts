import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { City } from "../model/city";

@Injectable()
export class CitiesRepository extends Dexie{
    city!: Dexie.Table<City, string>

    constructor(){
        super('citiesdb')
        this.version(1).stores({
            city: 'city'
        })
        this.city = this.table('city')
    }

    addCity(city: City): Promise<string>{
        return this.city.add(city)
    }

    getAllCities(): Promise<City[]>{
        return this.city.orderBy('city').toArray()
    }
}