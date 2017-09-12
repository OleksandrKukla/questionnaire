import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { QuestionnaireDataService } from "../../questionnaireData.service"

@Component({
	moduleId: module.id,
	selector: "questionSocial",
	templateUrl: "questionSocial.component.html",
	styleUrls: ["questionSocial.component.css"]
})
export class QuestionSocialComponent implements OnInit {
	private questionData;
	private userForm: FormGroup;
	private socialNetworks = [
		{
			"input_id": 'input_fb_social',
			"name": 'Facebook',
			"value": '',
			"placeholder": 'Ваша страница в Facebook',
			"selected": false,
			"invalid": false
		},
		{
			"input_id": 'input_vk_social',
			"name": 'Вконтакте',
			"value": '',
			"placeholder": 'Ваша страница в Вконтакте',
			"selected": false,
			"invalid": false
		},
		{
			"input_id": 'input_tw_social',
			"name": 'Twitter',
			"value": '',
			"placeholder": 'Ваша страница в Twitter',
			"selected": false,
			"invalid": false
		},
		{
			"input_id": 'input_odn_social',
			"name": 'Однокласники',
			"value": '',
			"placeholder": 'Ваша страница в Однокласники',
			"selected": false,
			"invalid": false
		}
	]

	constructor (
		private dataService: QuestionnaireDataService,
		private fb: FormBuilder
	) {
		this.questionData = dataService.data;

		if (this.questionData['questionSocial']) {
			this.socialNetworks = this.questionData['questionSocial'].socialNetworks;
		}
	}

	ngOnInit () {
		this.buildForm();
	}

	buildForm () {
		let formSettings = {};

		for (let social of this.socialNetworks) {
			formSettings[social.input_id] = [
				social.value,
				[ Validators.required ]
			];
		}

		this.userForm = this.fb.group(formSettings);

		this.userForm.valueChanges
            .subscribe(data => this.onValueChange(data));
	}

	onValueChange (data) {
		if (!data || !this.userForm) { return; }

		let form = this.userForm;

		for (let social of this.socialNetworks) {
			social.value = data[social.input_id];

			let control = form.get(social.input_id);

			social.invalid = (control && control.dirty && !control.valid);
		}

		this.updateDataService();
	}

	changeCheckbox (checkboxIndex) {
		let checkbox = this.socialNetworks[checkboxIndex];

		if (checkbox) {
			checkbox.selected = !checkbox.selected;
		}

		this.updateDataService();
	}

    updateDataService () {
		this.questionData['questionSocial'] = {
			socialNetworks: this.socialNetworks, 
			isValid: this.validate()
		};
	}

	validate () {
		let isValid = false;

		for (let social of this.socialNetworks) {
			if (social.selected) {
				isValid = !!(social.value && social.value.length);
			} 
		}

		return isValid;
	}
}