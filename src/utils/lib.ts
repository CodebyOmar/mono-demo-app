const sortDate = (datestring: string) => {
  const split = datestring.split("-")
  const month = new Date(split[0]).toLocaleString("default", {month: "long"})
  const year = split[1]

  return `${month} ${year}`
}

function ConvertCurrency(amount: number) {
  if (amount > 0) {
    return Number(amount/100)
  } else {
    return 0
  }
}

function removeAllButLast(string: string, token: string) {
  const parts = string.split(token);

  if (parts[1] === undefined) {
    return string;
  }

  return (parts.length > 1) ? parts.slice(0, -1).join('') + token + parts.slice(-1) : '';
}

export {
  sortDate,
  ConvertCurrency,
  removeAllButLast
}