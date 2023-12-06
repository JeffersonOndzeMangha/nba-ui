// A mock function to mimic making an async request for data
export function fetchPlayers(search?: string) {
  return new Promise<{ data: any[] }>((resolve) =>
    setTimeout(() => resolve({ data: [] }), 500)
  );
}
