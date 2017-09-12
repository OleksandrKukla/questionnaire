import { Component } from "@angular/core";
import { NgSwitch } from '@angular/common';

import { QuestionnaireDataService } from "../questionnaireData.service"

@Component({
	moduleId: module.id,
	selector: "questionnaire",
	templateUrl: "questionnaire.component.html",
	styleUrls: ["questionnaire.component.css"]
})
export class QuestionnaireComponent {
	private questions = [
		'questionName',
		'questionCity',
		'questionSocial',
		'questionImage'
	];
	private questionnaireData;
	private currentFrame;
	private isSuccessful = false;

	constructor (private dataService: QuestionnaireDataService) {
		this.questionnaireData = dataService.data;

		this.currentFrame = 0;

		this.getLastValidFrame();
	};

	nextFrame () {
		if (
			this.currentFrame < (this.questions.length - 1)
			&& (this.currentFrame <= this.getLastValidFrame())
		) {
			++this.currentFrame;
		}
	}

	prevFrame () {
		if (this.currentFrame > 0) {
			--this.currentFrame;
		}
	}

	getLastValidFrame () {
		var validFrame = -1;

		for (let i in this.questions) {
			let questionData = this.questionnaireData[this.questions[i]];
			let _i = Number(i);
			if (questionData && questionData.isValid) {
				validFrame = ((validFrame + 1) === _i) ? _i : validFrame; // all previous also valid
			}
		}

		this.isSuccessful = (validFrame + 1) === this.questions.length;

		return validFrame;
	}

	showResults () {
		this.currentFrame = this.questions.length;
	}

	chooseFrame (num) {
		if (
			(num >= 0)
			&& (num < this.questions.length)
			&& ((num - 1) <= this.getLastValidFrame())
		) {
			this.currentFrame = num;
		}
	}

	restart () {
		this.dataService.reinit();

		this.questionnaireData = this.dataService.data;
		this.currentFrame = 0;

		this.getLastValidFrame();
	}
}