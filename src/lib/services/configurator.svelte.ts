import type { ICountry } from './db';

class CountryConfigurator {
	public opened: boolean = $state(false);
	public draft = $state<ICountry | null>(null);

	constructor() {}

	public open(country: ICountry) {
		this.opened = true;
		this.draft = country;
		if (!country.properties.saved) {
			this.draft.properties.style.className = 'saved';
		}
	}

	public close() {
		this.opened = false;
		this.draft = null;
	}
}

const configurator = new CountryConfigurator();

export default configurator;
