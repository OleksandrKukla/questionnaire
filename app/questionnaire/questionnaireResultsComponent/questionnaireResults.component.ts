import { Component } from "@angular/core";

import { QuestionnaireDataService } from "../questionnaireData.service"

@Component({
	moduleId: module.id,
	selector: "questionnaireResults",
	templateUrl: "questionnaireResults.component.html",
	styleUrls: ["questionnaireResults.component.css"]
})
export class QuestionnaireResultsComponent {
	private questionnaireData;

	private questionName = {};
	private questionCity = {};
	private questionSocial = {};
	private questionImage = {};

	constructor(private dataService: QuestionnaireDataService) {
		this.questionnaireData = dataService.data;

		if (this.questionnaireData) {
			this.questionName = (this.questionnaireData['questionName']) 
				? this.questionnaireData['questionName'] 
				: {};

			this.questionCity = (this.questionnaireData['questionCity']) 
				? this.questionnaireData['questionCity'] 
				: {};

			this.questionSocial = (this.questionnaireData['questionSocial']) 
				? this.questionnaireData['questionSocial'] 
				: {};

			this.questionImage = (this.questionnaireData['questionImage']) 
				? this.questionnaireData['questionImage'] 
				: {};
		}

		console.log(this.questionSocial);
	}
}