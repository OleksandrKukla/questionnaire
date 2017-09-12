import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { QuestionnaireDataService } from "../../questionnaireData.service"

@Component({
	moduleId: module.id,
	selector: "questionName",
	templateUrl: "questionName.component.html",
	styleUrls: ["questionName.component.css"]
})
export class QuestionNameComponent implements OnInit {
	private userForm: FormGroup;
	private questionData;
	private name;
	private email;

	private formErrors = {
        "name": {
        	"value": '',
        	"show": false
        },
        "email":  {
        	"value": '',
        	"show": false
        }
    }

    private validationMessages = {
        "name": {
            "required": "— обязательное поле",
        },
        "email": {
            "required": "— обязательное поле",
            "pattern": "— не правильный формат email адреса",
        },
    }

	constructor (
		private dataService: QuestionnaireDataService,
		private fb: FormBuilder
	) {
		this.questionData = dataService.data;

		if (this.questionData['questionName']) {
			this.name = this.questionData['questionName'].name;
			this.email = this.questionData['questionName'].email;
			this.formErrors = this.questionData['questionName'].formErrors;
		}
	}

	ngOnInit () {
		this.buildForm();
	}

	buildForm () {
		this.userForm = this.fb.group({
			"name": [this.name, [
                Validators.required
            ]],
            "email": [this.email, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            ]],
		});

		this.userForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange();
	}

	onValueChange (data?: any) {	
        if (!this.userForm) return;
        let form = this.userForm;

        for (let field in this.formErrors) {
            this.formErrors[field].value = "";
            let control = form.get(field);


			for (let key in control.errors) {
				let message = this.validationMessages[field];
                this.formErrors[field].value += message[key] + " ";

                this.formErrors[field].show = !!(control && control.dirty && !control.valid);
            }
        }

        this.updateDataService(form);
    }

    updateDataService (form?: any) {
		if (form) {
			let name = form.get('name');
			let email = form.get('email');

			this.questionData['questionName'] = {
				name: (name) ? name.value : '',
				email: (email) ? email.value : '',
				formErrors: this.formErrors,
				isValid: this.validate()
			};
		}
	}

	validate () {
		let isValid = true;

		for (let key in this.formErrors) {
			if (
				this.formErrors[key] 
				&& this.formErrors[key].value 
				&& this.formErrors[key].value.length
			) {
				isValid = false;
				break;
			}
		} 

		return isValid;
	}
}