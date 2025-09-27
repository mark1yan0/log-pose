export type TMarkerIcon = 'pin' | 'city' | 'sea' | 'mountains';

export interface IMarker {
	icon: TMarkerIcon;
	color: string;
	label: string;
}

export interface IPlaceOptions {
	style?: { fillColor: string };
	marker?: IMarker;
}
