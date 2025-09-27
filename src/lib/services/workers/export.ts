import { exportDB, importInto } from 'dexie-export-import';
import { db } from '../db';

// Message handler
self.onmessage = async (event: MessageEvent) => {
	const { action, payload } = event.data;

	try {
		if (action === 'export') {
			console.log('export started');
			const blob = await exportDB(db);
			const arrayBuffer = await blob.arrayBuffer();
			(self as any).postMessage({ action: 'export-done', payload: arrayBuffer }, [arrayBuffer]);
			console.log('export done');
		}

		if (action === 'import') {
			const blob = new Blob([payload], { type: 'application/json' });
			await db.countries.clear();
			await db.coordinates.clear();
			await importInto(db, blob);
			(self as any).postMessage({ action: 'import-done' });
		}
	} catch (err: any) {
		(self as any).postMessage({ action: 'error', payload: err.message });
	}
};
