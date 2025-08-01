export interface IQuery<D extends unknown> {
    data: D | null;
    isLoading: boolean;
    error: Error | null;
}
