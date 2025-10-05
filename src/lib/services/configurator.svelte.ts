import type { ICountry } from './db';

class CountryConfigurator {
	public opened: boolean = $state(false);
	public draft = $state<ICountry | null>(null);

	constructor() {}

	public open(country: ICountry) {
		this.opened = true;
		this.draft = country;
		// TODO: define a default style when saving a new country
		// TODO: add a randomizer
		if (!country.properties.saved) {
			// set a default fill color initially for new countries
			this.draft.properties.style.fillColor = '#2596be';
		}
	}

	public close() {
		this.opened = false;
		this.draft = null;
	}
}

const configurator = new CountryConfigurator();

export default configurator;
