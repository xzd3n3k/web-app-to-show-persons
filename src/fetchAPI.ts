export default async function fetchAPI<T>(api: string): Promise<T | null> {
    try {
        const response = await fetch(api);

        if (response.ok) {
            return await response.json();

        } else {
            console.error(response.status, response.statusText ?? null);
            return null;
        }
    } catch (err) {
        console.error('Error fetching api', err);
        return null;
    }
}
