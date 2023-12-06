// A mock function to mimic making an async request for data
export function fetchPlayers(search?: string, filters?: {
  [key: string]: string | number;
}) {
  return new Promise<{ data: {data: any[], meta: any} }>((resolve, reject) =>
    fetch(`https://www.balldontlie.io/api/v1/players?${
      search ? `search=${search}` : ''
    }${
      filters ? `&${Object.keys(filters).map((key) => `${key}=${filters[key]}`).join('&')}` : ''
    }`).then((response) =>
      response
        .json()
        .then((resp) => resolve(resp))
        .catch((error) => reject(error))
    )
  );
}
