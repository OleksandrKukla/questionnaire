import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { QuestionnaireComponent } from "./questionnaireComponent/questionnaire.component";
import { QuestionnaireResultsComponent } from "./questionnaireResultsComponent/questionnaireResults.component";

import { QuestionNameComponent } from "./questions/questionNameComponent/questionName.component";
import { QuestionCityComponent } from "./questions/questionCityComponent/questionCity.component";
import { QuestionImageComponent } from "./questions/questionImageComponent/questionImage.component";
import { QuestionSocialComponent } from "./questions/questionSocialComponent/questionSocial.component";

import { QuestionnaireDataService } from "./questionnaireData.service";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		HttpModule,
		FormsModule
	],
	declarations: [
		QuestionnaireComponent,
		QuestionNameComponent,
		QuestionCityComponent,
		QuestionImageComponent,
		QuestionSocialComponent,
		QuestionnaireResultsComponent
	],
	exports: [
		QuestionnaireComponent,
		QuestionNameComponent,
		QuestionCityComponent,
		QuestionImageComponent,
		QuestionSocialComponent,
		QuestionnaireResultsComponent
	],
	providers: [
		QuestionnaireDataService,
	]
})
export class QuestionnaireModule { }
