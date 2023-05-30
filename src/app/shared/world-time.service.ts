import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {

  arrTimeZones = [
    { timeZone: 'Australia/Sydney', strCountry: 'Sydney' },
    { timeZone: 'Asia/Singapore', strCountry: 'Singapore' },
    { timeZone: 'Asia/Tokyo', strCountry: 'Tokyo' },
    { timeZone: 'America/Los_Angeles', strCountry: 'Log Angeles' },
    { timeZone: 'America/New_York', strCountry: 'New York' },
    { timeZone: 'Europe/London', strCountry: 'London' },
    { timeZone: 'Etc/UTC', strCountry: 'UTC' },
  ]

  strApiURL = 'https://worldtimeapi.org/api/timezone/';

  constructor(
    public datePipe: DatePipe,
  ) { }

  async GetWorldTime() {
    let arrWorldTime: any[] = [];
    arrWorldTime = await this.GetTime(this.arrTimeZones);
    return await arrWorldTime;
  }

  async GetTime(timezoneArray) {
    let arrWorldTime: any[] = [];
    
    for (let i = 0; i < timezoneArray.length; ++i) {
      let timeData;
      timeData = await this.GetTimeCall(timezoneArray[i].timeZone)
      arrWorldTime[i] = {
        location: timezoneArray[i].strCountry,
        dateToday: this.datePipe.transform(timeData.datetime, "MMMM d, yyyy",timeData.datetime.utc_offset),
        timeNow: this.datePipe.transform(timeData.datetime, "HH:mm", timeData.utc_offset),
      };
    }
    return await arrWorldTime
  }

  async GetTimeCall(timeZone) {
    const FetchTime = await fetch(this.strApiURL + timeZone, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(error => console.log('error', error))
    let responseJson = FetchTime;
    return await responseJson
  }

}
