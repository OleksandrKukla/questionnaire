import { Component, OnInit } from "@angular/core";
import { Http } from '@angular/http';

import { QuestionnaireDataService } from "../../questionnaireData.service";

@Component({
	moduleId: module.id,
	selector: "questionCity",
	templateUrl: "questionCity.component.html",
	styleUrls: ["questionCity.component.css"]
})
export class QuestionCityComponent implements OnInit {
	private questionData;
	private countries = [];
	private allCities = [];
	private cities = [];
	private selectedCountry = '-1';
	private selectedCity = '-1';

	constructor (
		private dataService: QuestionnaireDataService,
		private http:Http
	) {
		this.questionData = dataService.data;

		if (this.questionData['questionCity']) {
			this.countries = this.questionData['questionCity'].countries;
			this.allCities = this.questionData['questionCity'].allCities;
			this.cities = this.questionData['questionCity'].cities;
			this.selectedCountry = this.questionData['questionCity'].selectedCountry;
			this.selectedCity = this.questionData['questionCity'].selectedCity;
		}
	}

	ngOnInit () {
		let self = this;

		if (!this.countries.length) {
			this.http.request('/assets/data/countries.json')
                    .subscribe(response => this.buildCountryArray(response.json()));
        }

        if (!this.countries.length) {
			this.http.request('/assets/data/cities.json')
                    .subscribe(response => this.buildCityArray(response.json()));
        }

        this.updateInfo();
	}

	buildCountryArray (countries) {
		if (!countries) { return; }

		for (let index in countries) {
			this.countries.push({
				id: String(index),
				name: countries[index]
			});
		}
	}

	buildCityArray (cities) {
		if (!cities) { return; }

		for (let index in cities) {
			this.allCities.push({
				id: String(index),
				country: String(cities[index].country),
				name: cities[index].name
			});
		}

		this.getCitiesOfCountry();
	}

	getCitiesOfCountry () {
		this.cities = [];

		if (
			!this.allCities.length
			|| this.selectedCountry === '-1'
		) { return; }

		for (let city of this.allCities) {
			let country = this.getCountryById(this.selectedCountry) || {};

			if (
				city.country === this.selectedCountry
				&& country.name !== city.name
			) {
				city.selected = false;
				this.cities.push(city);
			}
		}
	}

	getCountryById (id) {
		for (let country of this.countries) {
			if (country.id === id) {
				return country;
			}
		}
	}

	getCityById (id) {
		for (let city of this.cities) {
			if (city.id === id) {
				return city;
			}
		}
	}

	onChangeCountry (data) {
		this.selectedCountry = data;
		this.selectedCity = '-1';
		this.getCitiesOfCountry();

		this.updateDataService();
	}

	onChangeCity (data) {
		this.selectedCity = data;

		this.updateDataService();
	}

	updateDataService () {
		let country = this.getCountryById(this.selectedCountry);
		let city = this.getCityById(this.selectedCity);

		country = country && country.name;
		city = city && city.name;

		this.questionData['questionCity'] = {
			countries: this.countries,
			allCities: this.allCities,
			cities: this.cities,
			selectedCountry: this.selectedCountry,
			selectedCity: this.selectedCity,
			countryName: country,
			cityName: city,
			isValid: this.validate()
		};
	}

	updateInfo () {
		let country = this.getCountryById(this.selectedCountry);
		let city = this.getCityById(this.selectedCity);

		if (country) {
			country.selected = true;
		}

		if (city) {
			city.selected = true;
		}
	}

	validate () {
		return (this.selectedCity !== '-1' && this.selectedCountry !== '-1');
	}
}