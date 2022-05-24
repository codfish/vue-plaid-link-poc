export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response
};

export async function getLinkToken() {
  const resp = await postData('http://localhost:6060/api/v1/plaid/init',
    { user_email:'some-test-user@leaflink.com', user_id: "abc123" }
  );
  const data = await resp.json()
  return data.link_token;
}

export const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (!src) {
      return reject('No valid script was provided');
    }

    let script = document.createElement('script');
    script.src = src;

    script.onload = resolve;
    script.onerror = reject;

    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);

    document.head.appendChild(script);
  });
};

export async function createPlaidLink(options) {
  await loadScript('https://cdn.plaid.com/link/v2/stable/link-initialize.js');

  if (!options.token) {
    throw new Error('no token')
  }

  return Plaid.create(options);
}
