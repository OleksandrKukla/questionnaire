import { Injectable } from "@angular/core";

@Injectable()
export class QuestionnaireDataService {
	public data = {};

	reinit () {
		this.data = {};
	}
}