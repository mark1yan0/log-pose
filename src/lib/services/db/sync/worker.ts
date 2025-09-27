import { exportDB, importInto } from 'dexie-export-import';
import { db } from '..';

// Message handler
self.onmessage = async (event: MessageEvent) => {
	const { action, payload } = event.data;

	try {
		if (action === 'export') {
			const blob = await exportDB(db);
			const arrayBuffer = await blob.arrayBuffer();
			self.postMessage({ action: 'export-done', payload: arrayBuffer }, [arrayBuffer]);
		}

		if (action === 'import') {
			const blob = new Blob([payload], { type: 'application/json' });
			await db.countries.clear();
			await db.coordinates.clear();
			await importInto(db, blob);
			self.postMessage({ action: 'import-done' });
		}
	} catch (err) {
		if (err instanceof Error) {
			self.postMessage({ action: 'error', payload: err.message });
		}
	}
};
