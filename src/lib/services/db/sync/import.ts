import { toast } from 'svelte-sonner';

const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
// Import
export function importIntoDatabase(file: File) {
	return new Promise<void>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			worker.onmessage = (event) => {
				const { action, payload } = event.data;
				if (action === 'import-done') {
					toast.success('Database imported successfully!');
					resolve();
				}
				if (action === 'error') {
					toast.error('Error in import occured');
					reject(payload);
				}
			};

			toast.info('Database import started...');
			worker.postMessage({ action: 'import', payload: reader.result }, [
				reader.result as ArrayBuffer
			]);
		};
		reader.readAsArrayBuffer(file);
	});
}
