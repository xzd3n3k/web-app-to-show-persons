export default async function fetchAPI<T>(api: string): Promise<T | null> {

    const response = await fetch(api);

    if (response.ok) {
        return await response.json();

    } else {
        console.error(response.status, response.statusText ?? null);
        return null;
    }
}
