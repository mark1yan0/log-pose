import type { ICountry } from './db';

class CountryConfigurator {
	public opened: boolean = $state(false);
	public draft = $state<ICountry | null>(null);
	public fields: IConfigField[] = [];

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

		this.buildFields(country.properties.style);
	}

	public close() {
		this.opened = false;
		this.draft = null;
		this.fields = [];
	}

	private buildFields(props: object) {
		Object.entries(props).forEach(([k, v]) => {
			let type: IConfigField['type'] = 'color';

			if (typeof v === 'number') {
				type = 'number';
			}

			// TODO: make numbers ranges
			this.fields.push({
				label: k,
				defaultValue: v as string | number,
				type
			});
		});
	}
}

const configurator = new CountryConfigurator();

export default configurator;

interface IConfigField {
	type: 'color' | 'number';
	defaultValue: string | number;
	label?: string;
	description?: string;
}
