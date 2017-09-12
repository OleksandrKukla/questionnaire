import { NgModule} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

// modules
import { QuestionnaireModule } from "./questionnaire/questionnaire.module"; 


@NgModule({
	imports: [
		BrowserModule,
		QuestionnaireModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }