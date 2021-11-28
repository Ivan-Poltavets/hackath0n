const host = '192.168.1.4:5000';
// const host = 'localhost:5000';
// const host = '10.0.2.2:5000';
// const host = '10.0.3.2:5000';

export const fetchData = async ({ method = 'get', url, data = {}, token }) => {
  const response = await fetch(`http://${host}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token ? `Basic ${token}` : '',
    },
    body: Object.keys(data)?.length ? JSON.stringify(data) : null,
  });

  return response.json();
};
