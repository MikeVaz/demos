export default class NPMStatService {
	constructor(params) {
		this.params = params
	}

	get url() {
		return `https://api.npmjs.org/downloads/range/${this.params.rangeFrom}:${this.params.rangeUntil}/${this.params.package}`;
	}

	handleResponse(response) {
		if (response.status >= 200 && response.status < 300) {
			return response.json() || response.text();
		} else {
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}
	
	request(params) {
		Object.assign(this.params, params);
		return fetch(this.url, this.params);
	}
}
