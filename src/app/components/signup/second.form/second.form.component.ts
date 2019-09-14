import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import csc from 'country-state-city';

@Component({
  selector: 'app-second-form',
  templateUrl: './second.form.component.html',
  styleUrls: ['./second.form.component.css']
})
export class SecondFormComponent implements OnInit {

  @Input() secondFormGroup: FormGroup;
  public permanentStateList: any = [];
  public presentStateList: any = [];
  public permanentCityList: any = [];
  public presentCityList: any = [];
  public sameAddress = false;

  constructor() {
  }

  ngOnInit() {
    this.permanentStateList = csc.getStatesOfCountry('101');
    this.presentStateList = csc.getStatesOfCountry('101');
  }

  onPresentStateChange(event) {
    this.presentCityList = csc.getCitiesOfState('' + event.value);
  }

  onPermanentStateChange(event) {
    this.permanentCityList = csc.getCitiesOfState('' + event.value);
  }

  toggleSameAddress() {
    this.sameAddress = !this.sameAddress;
    if (this.sameAddress) {
      this.secondFormGroup.get('permanentAddress').disable();
      const presentAddress = this.secondFormGroup.value.presentAddress.address;
      const presentCity = this.secondFormGroup.value.presentAddress.city;
      const presentState = this.secondFormGroup.value.presentAddress.state;
      const presentCountry = this.secondFormGroup.value.presentAddress.country;
      console.log(presentCity, presentState, presentAddress, presentCountry);
      this.permanentCityList = this.presentCityList;
      this.secondFormGroup.get('permanentAddress').get('address').setValue(presentAddress);
      this.secondFormGroup.get('permanentAddress').get('city').setValue(presentCity);
      this.secondFormGroup.get('permanentAddress').get('state').setValue(presentState);
      this.secondFormGroup.get('permanentAddress').get('country').setValue(presentCountry);
    } else {
      this.secondFormGroup.get('permanentAddress').enable();
    }
  }

}
