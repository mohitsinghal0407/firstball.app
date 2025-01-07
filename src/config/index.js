const production = false;
const appVersion = "v5";
const appName = "FirstBall";

const siteUrl = "https://firstball.in";
const liveHost = "https://api.firstball.in/api/v1";
const testHost = "https://api.firstball.in/api/v1";
const playStoreUrl = "https://play.google.com/store/apps/details?id=com.firstballapp";
// const testHost = "http://localhost:3000/api/v1";

const livekitServerUrl = 'wss://stream.firstball.in';

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
	static siteUrl = siteUrl;
	static livekitServerUrl = livekitServerUrl;
	static errorMessage = errorMessage;
	static playStoreUrl = playStoreUrl;
}