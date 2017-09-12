import { Component } from "@angular/core";

import { QuestionnaireDataService } from "../../questionnaireData.service"

@Component({
	moduleId: module.id,
	selector: "questionImage",
	templateUrl: "questionImage.component.html",
	styleUrls: ["questionImage.component.css"]
})
export class QuestionImageComponent {
	private images = [
		'/assets/images/img1.jpg',
		'/assets/images/img2.jpg',
		'/assets/images/img3.jpg',
		'/assets/images/img4.jpg',
	];
	private questionData;
	private errorMessage = "Вы выбрали собачку. А надо котика.";
	private selectedImage;
	private hasChoose;

	constructor(private dataService: QuestionnaireDataService) {
		this.questionData = dataService.data;

		if (this.questionData['questionImage']) {
			this.selectedImage = this.questionData['questionImage'].selectedImage;
			this.hasChoose = this.questionData['questionImage'].hasChoose;
		}
	};

	selectImage (num) {
		this.hasChoose = true;
		this.selectedImage = num;

		this.updateDataService();
	};

	validate () {
		return (
			typeof this.selectedImage !== 'undefined' 
			&& this.selectedImage !== 3
		);
	};

	updateDataService () {
		this.questionData['questionImage'] = {
			selectedImage: this.selectedImage,
			selectedImageSrc: this.images[this.selectedImage],
			hasChoose: this.hasChoose,
			isValid: this.validate()
		};
	}
}