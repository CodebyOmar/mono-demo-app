import React from 'react'
import { GetBalance } from '../utils/mono-challenge-api'

const AccountBalance: React.FC<{id: string}> = (props) => {
  const [data, setData] = React.useState<any>(() => ({ balance: 0, loading: true }))
  const [error, setError] = React.useState<any>(null)
  const fetchBalance = React.useCallback(() => {
    setError(null)
    GetBalance(props.id)
      .then(response => setData({...response.data, loading: false}))
      .catch(err => {
        setData((data: any) => ({...data, loading: false}))
        setError(err.message)
      })
  }, [props.id])

  React.useEffect(() => fetchBalance(), [fetchBalance])

  return (
    <div className="bg-blue-600 shadow rounded-lg py-6 px-4 text-white">
      {error ? (
        <span className="text-red-500 text-sm">
          Failed to fetch balance.
          <span role="button" onClick={fetchBalance}>{" "}Retry</span>
        </span>
      ) : null}

      <span className="text-xs font-medium uppercase tracking-wide block">account balance</span>

      {!data.loading ? (
        <span className="font-bold text-3xl block">
          {(data.balance).toLocaleString("en-NG", {style: 'currency', currency: "NGN"})}
        </span>
      ) : null}

      {data.loading && <div className="h-12 mt-2 bg-ble-400 rounded animate-pulse w-3/4"></div>}
    </div>
  )
}

export default AccountBalance