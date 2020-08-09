import React from 'react'
import { GetCredits } from '../utils/mono-challenge-api'
import TransactionLoader from './TransactionLoader'
import { sortDate, ConvertCurrency } from '../utils/lib'

const CreditList: React.FC<{id: string}> = (props) => {
  const [data, setData] = React.useState<any>({credits: [], loading: true})
  const [error, setError] = React.useState<any>(null)
  const FetchCreditList = React.useCallback(() => {
    setError(null)
    GetCredits(props.id)
      .then(response => setData((d: any) => ({credits: response.data.history, loading: false})))
      .catch(err => {
        setData((d: any) => ({...d, loading: false}))
        setError(err.message)
      })
  }, [props.id])

  React.useEffect(() => FetchCreditList(), [FetchCreditList])

  return (
    <React.Fragment>
      {data.loading ? <TransactionLoader /> : null}

      {!error && !data.loading ? (
        <div className="h-72 overflow-y-scroll">
          {data.credits.map((c: any, index: number) => (
            <div className="flex items-center w-full" key={index}>
              <div className="flex items-center justify-center bg-green-100 rounded-full w-12 h-12">
                <svg className="w-6 text-green-800" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="17" y1="7" x2="7" y2="17"></line>
                  <polyline points="17 17 7 17 7 7"></polyline>
                </svg>
              </div>

              <div className="my-4 flex justify-between mx-3 w-5/6">
                <div>
                  <span className="font-medium text-base text-gray-600 block">Credit transaction</span>
                  <span className="text-xs text-gray-400 block">{sortDate(c.period)}</span>
                </div>

                <div className="text-right">
                  <span className="text-base text-gray-900 font-medium block">
                    {ConvertCurrency(c.amount).toLocaleString("en-NG", {style: 'currency', currency: 'NGN'})}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {data.credits.length === 0 ? (
            <div className="text-gray-500 text-lg text-center">No enough data to display</div>
          ) :null}
        </div>
      ): null}

      {error ? (
        <div className="flex flex-col items-center sm:mt-32 mt-10">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 sm:mx-0 sm:h-32 sm:w-32">
            <svg className="h-20 w-20 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div className="text-sm font-meduim text-gray-600 pt-2">
            {error || "Connection Error"} 
            <span className="text-red-600 underline font-bold cursor-pointer" onClick={() => FetchCreditList()}> Retry</span>
          </div>
        </div>
      ): null}
    </React.Fragment>
  )
}

export default CreditList