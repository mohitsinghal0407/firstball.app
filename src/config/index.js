const production = false;
const appVersion = "Version 1.0";
const appName = "BabyGenie";

const liveHost = "";
const liveFiles = "";

const testHost = "https://api.firstball.in/api/v1";

const testFiles = "";

const errorMessage = {
	NOT_FOUND: 'NOT_FOUND',
	FORBIDDEN: 'FORBIDDEN',
	PAYMENT_INTENT_ID_IS_NOT_VALID: 'PAYMENT_INTENT_ID_IS_NOT_VALID',
	UNAUTHENTICATED: 'UNAUTHENTICATED',
	UNAUTHORIZED: 'UNAUTHORIZED',
	MISSING_ACCESS_TOKEN: 'MISSING_ACCESS_TOKEN',
	MALFORMED_ACCESS_TOKEN: 'MALFORMED_ACCESS_TOKEN',
	EXPIRED_ACCESS_TOKEN: 'EXPIRED_ACCESS_TOKEN',
	INVALID_EMAIL_OR_PASSWORD: 'INVALID_EMAIL_OR_PASSWORD',
	EMAIL_IS_ALREADY_TAKEN: 'EMAIL_IS_ALREADY_TAKEN',
	PASSWORD_IS_NOT_VALID: 'PASSWORD_IS_NOT_VALID',
	PLAN_ALREADY_HAS_FEEDBACK: 'PLAN_ALREADY_HAS_FEEDBACK',
	PREVIOUS_DATE_OF_BIRTH_IS_LATER_THAN_FIRST_DAY_OF_CYCLE: 'PREVIOUS_DATE_OF_BIRTH_IS_LATER_THAN_FIRST_DAY_OF_CYCLE',
	NO_PRODUCT_FOUND_BY_NAME: 'NO_PRODUCT_FOUND_BY_NAME',
	REVEAL_ALREADY_HAS_FEEDBACK: 'REVEAL_ALREADY_HAS_FEEDBACK',
	PREVIOUS_DATE_OF_BIRTH_IS_LATER_THAN_DUE_DATE: 'PREVIOUS_DATE_OF_BIRTH_IS_LATER_THAN_DUE_DATE',
	MISSING_CLIENT_SECRET_IN_PAYMENT_INTENT: 'MISSING_CLIENT_SECRET_IN_PAYMENT_INTENT',
}

export class Config {
	static appName = appName;
	static accessToken = "";
	static isProduction = production;
	static appVersion = appVersion;
	static appHeader = {
		Accept: "application/json",
		// "Content-Type": `multipart/form-data`,
		appversion: this.appVersion.toLowerCase(),
	};

	static baseUrl = production ? liveHost : testHost;
	static url = production ? liveFiles : testFiles;
	
	static errorMessage = errorMessage;
}
