import { toast } from 'svelte-sonner';

const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
// TODO: handle error
// Export
export function exportDatabase() {
	let opened: string | number = '';
	return new Promise<ArrayBuffer>((resolve, reject) => {
		worker.onmessage = (event) => {
			const { action, payload } = event.data;
			if (action === 'export-done') {
				const blob = new Blob([payload], { type: 'application/json' });
				const url = URL.createObjectURL(blob);

				const a = document.createElement('a');
				a.href = url;
				a.download = 'logpose_db.json';
				a.click();

				toast.dismiss(opened);
				toast.success('Database exported successfully!');
				URL.revokeObjectURL(url);
				resolve(payload);
			}
			if (action === 'error') reject(payload);
		};

		// start event
		opened = toast.info('Database export started...', {
			duration: Infinity
			// action: { TODO
			// 	label: 'Cancel',
			// 	onClick: () => worker.postMessage({ action: 'cancel' })
			// }
		});
		worker.postMessage({ action: 'export' });
	});
}
