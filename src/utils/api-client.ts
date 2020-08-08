function client(endpoint: string, {body, refresh, ...customConfig}:any = {}) {
  const headers: any = {'content-type': 'application/json'}

  const config: any = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const controller = new AbortController();
  const { signal } = controller;
  
  return new Promise<any>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("ERR_REQUEST_TIMED_OUT"));
      controller.abort();
    }, 45000);
    
    window
      .fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`, 
        {...config, signal}
      )
      .finally(() => clearTimeout(timer))
      .then(r => resolve(r.json()), reject)
  })
}

export { client }