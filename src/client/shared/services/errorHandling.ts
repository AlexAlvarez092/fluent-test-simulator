export function reportAsyncError(err: unknown, onError: () => void): void {
    onError();
    console.error(err);
}
