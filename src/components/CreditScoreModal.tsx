import React from 'react'
import Transition from './Transition'
import AccountBalance from './AccountBalance'
import DebitList from './DebitList'
import CreditList from './CreditList'
import { GetCreditScore } from '../utils/mono-challenge-api'

interface CreditScoreModalProps {
  open: boolean;
  close: () => void;
  userInfo: {
    id: string;
    name: string;
    email: string;
    amount: string;
  };
}

const CreditScoreModal: React.FC<CreditScoreModalProps> = (props) => {
  return (
    <div className="fixed bottom-0 inset-x-0 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-final">
      <Transition show={props.open} {...{
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0"
      }}>
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      </Transition>  

      <Transition show={props.open} {...{
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      }}>   
        <React.Fragment> 
          <div className="flex absolute bottom-24 justify-end py-2">
            <button onClick={props.close} className="bg-white py-1 px-2 rounded-full text-sm text-red-600 cursor-pointer outline-none">
              Close
            </button>
          </div>
          <UserDetails userInfo={props.userInfo} />
        </React.Fragment>
      </Transition>
    </div>
  )
}

interface UserDetailsProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
    amount: string;
  };
}

const UserDetails: React.FC<UserDetailsProps> = (props) => {
  const [transactionType, setTransactionType] = React.useState<string>("credits")
  const [data, setData] = React.useState<any>({ score: 0, loading: true })
  const [error, setError] = React.useState<any>(null)
  const GetScore: any = React.useCallback(() => {
    setError(null)

    const {name, email, id, amount} = props.userInfo
    GetCreditScore({name, email, monoId: id, amount: Number(amount)})
      .then((response: any) => setData({...response.data, loading: false}))
      .catch((err: any) => {
        setData((d: any) => ({...d, loading: false}))
        setError(err.message)
      })
  }, [props])

  React.useEffect(() => GetScore(), [GetScore])

  return (
    <div className="bg-white animate__animated animate__faster modal-pulse rounded-t-lg sm:rounded-lg px-4 py-12 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      {data.loading ? <div className="h-10 bg-blue-200 rounded animate-pulse w-full mb-5 sm:mt-b"></div> : null}

      {!error && !data.loading ? (
        <div className="mb-5 sm:mt-b">
          <span className="flex w-full rounded-md shadow-sm">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-3 bg-blue-100 text-lg leading-6 font-medium text-blue-900 shadow-sm hover:bg-blue-200 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              <span role="img" aria-label="confetti">🎉</span> 
              {" "} Congratulations you are eligible to access {(data.score).toLocaleString("en-NG", {currency: "NGN", style: "currency"})}
            </button>
          </span>
        </div>
      ): null}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 px-4 my-5 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <AccountBalance id={props.userInfo.id} />

      <div className="w-full pb-6 mt-3">
        <div className="bg-gray-200 rounded flex-row flex p-1">
          <button
            type="button" 
            onClick={() => setTransactionType('credits')} 
            className={`${transactionType === 'credits' ? 'bg-white shadow' : 'bg-transparent'} segment-btn`}>
              Credits
          </button>
          <button
            type="button"
            onClick={() => setTransactionType('debits')} 
            className={`${transactionType === 'debits' ? 'bg-white shadow' : 'bg-transparent'} segment-btn`}>
              Debits
          </button>
        </div>
      </div>

      {transactionType === "debits" ? <DebitList id={props.userInfo.id} /> : null}
      {transactionType === "credits" ? <CreditList id={props.userInfo.id} /> : null}
    </div>
  )
}

export default CreditScoreModal