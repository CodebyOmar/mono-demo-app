import { client } from "./api-client";

function Authenticate(code: string) {
  return client(`from-mono/user/${code}`)
    .then(response => {
        if (response.status !== "success") {
          return Promise.reject(response);
        }

        return Promise.resolve(response);
    },
    e => Promise.reject({ 
      message: "Please check your internet connection",
      status: 'error' 
    }))
}

function GetBalance(id: string) {
  return client(`from-mono/${id}/balance`)
    .then(response => {
        if (response.status !== "success") {
          return Promise.reject(response);
        }

        return Promise.resolve(response);
    },
    e => Promise.reject({ 
      message: "Please check your internet connection",
      status: 'error' 
    }))
}

function GetCredits(id: string) {
  return client(`from-mono/${id}/credits`)
    .then(response => {
        if (response.status !== "success") {
          return Promise.reject(response);
        }

        return Promise.resolve(response);
    },
    e => Promise.reject({ 
      message: "Please check your internet connection",
      status: 'error' 
    }))
}

function GetDebits(id: string) {
  return client(`from-mono/${id}/debits`)
    .then(response => {
        if (response.status !== "success") {
          return Promise.reject(response);
        }

        return Promise.resolve(response);
    },
    e => Promise.reject({ 
      message: "Please check your internet connection",
      status: 'error' 
    }))
}

function GetCreditScore(data: {name: string; email: string; monoId: string; amount: number;}) {
  return client(`score`, {body: {...data}})
    .then(response => {
        if (response.status !== "success") {
          return Promise.reject(response);
        }

        return Promise.resolve(response);
    },
    e => Promise.reject({ 
      message: "Please check your internet connection",
      status: 'error' 
    }))
}

export {
  Authenticate,
  GetBalance,
  GetCredits,
  GetDebits,
  GetCreditScore
}