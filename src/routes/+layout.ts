export const ssr = false;
export const csr = true;
export const prerender = false;

// Create worker
const worker = new Worker(new URL('./db-worker.ts', import.meta.url), { type: 'module' });

// Export
function exportDatabase() {
	return new Promise<ArrayBuffer>((resolve, reject) => {
		worker.onmessage = (event) => {
			const { action, payload } = event.data;
			if (action === 'export-done') resolve(payload);
			if (action === 'error') reject(payload);
		};
		worker.postMessage({ action: 'export' });
	});
}

// Import
function importDatabase(file: File) {
	return new Promise<void>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			worker.onmessage = (event) => {
				const { action, payload } = event.data;
				if (action === 'import-done') resolve();
				if (action === 'error') reject(payload);
			};
			worker.postMessage({ action: 'import', payload: reader.result }, [
				reader.result as ArrayBuffer
			]);
		};
		reader.readAsArrayBuffer(file);
	});
}

// Usage
async function backup() {
	const arrayBuffer = await exportDatabase();
	const blob = new Blob([arrayBuffer], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = 'mydb.json';
	a.click();

	URL.revokeObjectURL(url);
}

async function restore(file: File) {
	await importDatabase(file);
	console.log('Database restored');
}
