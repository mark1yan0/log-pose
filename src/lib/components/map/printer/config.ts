export type TExportSizes =
	| '4k-landscape'
	| '4k-portrait'
	| '1440p-landscape'
	| '4k-square'
	| 'story'
	| 'poster'
	| 'story-4k'
	| 'ultrawide'
	| '1440p-landscape'
	| '1440p-portrait'
	| '1080p-square'
	| 'story-4k'
	| 'poster-4k'
	| 'ultrawide-1080';

// config of exportable sizes for future selector
export const imageSizes: Record<
	TExportSizes,
	{
		width: number;
		height: number;
		aspectRatio: `${number}/${number}`;
		ratio: `${number}:${number}`;
		mobile: { width: number; height: number }; // 1080p fallback
	}
> = {
	// === Landscape (16:9) ===
	'4k-landscape': {
		width: 3840,
		height: 2160,
		aspectRatio: '16 / 9',
		ratio: '16:9',
		mobile: { width: 1920, height: 1080 } // 1080p fallback
	},
	'1440p-landscape': {
		width: 2560,
		height: 1440,
		aspectRatio: '16 / 9',
		ratio: '16:9',
		mobile: { width: 1280, height: 720 }
	},

	// === Portrait (9:16) ===
	'4k-portrait': {
		width: 2160,
		height: 3840,
		aspectRatio: '9 / 16',
		ratio: '9:16',
		mobile: { width: 1080, height: 1920 }
	},
	'1440p-portrait': {
		width: 1440,
		height: 2560,
		aspectRatio: '9 / 16',
		ratio: '9:16',
		mobile: { width: 720, height: 1280 }
	},

	// === Square (1:1) ===
	'4k-square': {
		width: 2160,
		height: 2160,
		aspectRatio: '1/1',
		ratio: '1:1',
		mobile: { width: 1080, height: 1080 }
	},
	'1080p-square': {
		width: 1080,
		height: 1080,
		aspectRatio: '1/1',
		ratio: '1:1',
		mobile: { width: 720, height: 720 }
	},

	// === Story / Reels (9:16) ===
	story: {
		width: 1080,
		height: 1920,
		aspectRatio: '9 / 16',
		ratio: '9:16',
		mobile: { width: 720, height: 1280 }
	},
	'story-4k': {
		width: 2160,
		height: 3840,
		aspectRatio: '9 / 16',
		ratio: '9:16',
		mobile: { width: 1080, height: 1920 }
	},

	// === Poster / A4-like (3:4) ===
	poster: {
		width: 1536,
		height: 2048,
		aspectRatio: '3 / 4',
		ratio: '3:4',
		mobile: { width: 768, height: 1024 }
	},
	'poster-4k': {
		width: 2304,
		height: 3072,
		aspectRatio: '3 / 4',
		ratio: '3:4',
		mobile: { width: 1152, height: 1536 }
	},

	// === Ultra-wide (21:9) ===
	ultrawide: {
		width: 3840,
		height: 1646,
		aspectRatio: '21 / 9',
		ratio: '21:9',
		mobile: { width: 1920, height: 823 }
	},
	'ultrawide-1080': {
		width: 2560,
		height: 1080,
		aspectRatio: '21 / 9',
		ratio: '21:9',
		mobile: { width: 1280, height: 540 }
	}
} as const;

export function getImageSize(key: TExportSizes) {
	const preset = imageSizes[key];
	if (!preset) throw new Error(`Unknown preset: ${key}`);

	const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	return isMobile && preset.mobile
		? { ...preset.mobile, aspectRatio: preset.aspectRatio, ratio: preset.ratio }
		: preset;
}
