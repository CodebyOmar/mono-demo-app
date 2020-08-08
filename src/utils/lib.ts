const sortDate = (datestring: string) => {
  const split = datestring.split("-")
  const month = new Date(split[0]).toLocaleString("default", {month: "long"})
  const year = split[1]

  return `${month} ${year}`
}

export {
  sortDate
}