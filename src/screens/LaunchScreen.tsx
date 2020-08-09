import React from 'react'
import Illustration from "../assets/images/clip-financial-report.png"
import Script from 'react-load-script';
import CreditScoreModal from '../components/CreditScoreModal';
import { useFormik } from 'formik'
import { Authenticate } from '../utils/mono-challenge-api';
import * as Yup from 'yup'
import InputErrorMessage from '../components/InputErrorMessage';
import NumberFormat from 'react-number-format'

declare const Connect: any;

const LaunchScreen: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = React.useState<boolean>(false)
  const [openScoreModal, setOpenScoreModal] = React.useState<boolean>(false)
  const [userId, setUserId] = React.useState<string>("")
  const [submitError, setSubmitError] = React.useState<string>("")
  const [monoInstance, setMonoInstance] = React.useState<any>(null)
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: { email: "", name: "", amount: ""},
    onSubmit: () => {
      monoInstance.open()
      if(!scriptLoaded) {
        alert("Failed to load script. Refresh page.")
      }
    }
  })

  function handleScriptLoad() {
    setScriptLoaded(true)
    const options = {
      onSuccess: function (response: any) {
        setSubmitError("")

        Authenticate(response.code).then(res => {
          setUserId(res.data.id)
          setTimeout(() => setOpenScoreModal(true), 500)
          connectMono.close()
        }).catch(err => {
          setSubmitError(`${err.message}`)
          connectMono.close()
        })
      },

      onClose: function () {}
    };

    const connectMono = new Connect(process.env.REACT_APP_MONO_PUBLIC_KEY, options);
    connectMono.setup();

    setMonoInstance(connectMono)
  }

  function handleScriptError() {
    setScriptLoaded(false)
  }

  return (
    <div className="max-h-screen bg-white py-12 sm:px-6 lg:px-8 mt-10">
      <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 items-center">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 sm:max-w-md md:col-span-1 col-span-2 items-center">
          <div className="sm:max-w-md">
            <h2 className="my-2 font-headline text-left text-3xl leading-9 font-extrabold text-gray-900">
              Know your credit score
            </h2>
            <p className="mt-2 text-left text-base leading-5 text-gray-400 max-w">
              Fill the form below and connect your bank account to know how much money you can access. Secured and powered by Mono.
            </p>
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 mt-10 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{submitError}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-8">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...formik.getFieldProps("email")} id="email" type="email" required className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
              </div>
              <InputErrorMessage {...formik.getFieldMeta("email")} />
            </div>

            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                Name
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input {...formik.getFieldProps("name")} id="name" type="text" required className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
              </div>
              <InputErrorMessage {...formik.getFieldMeta("name")} />
            </div>

            <div className="mt-6">
              <label htmlFor="amount" className="block text-sm font-medium leading-5 text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm sm:leading-5">
                    &#8358;
                  </span>
                </div>
                <NumberFormat 
                  thousandSeparator={true} 
                  id="amount" 
                  className="form-input py-3 block w-full pl-7 pr-12 sm:text-sm sm:leading-5" 
                  placeholder="0.00" 
                  aria-describedby="amount-currency" 
                  inputMode="numeric"
                  type="text"
                  {...formik.getFieldProps("amount")} />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm sm:leading-5" id="amount-currency">
                    NGN
                  </span>
                </div>
              </div>
              <InputErrorMessage {...formik.getFieldMeta("amount")} />
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-lg shadow-sm">
                <button type="submit" id="launch-widget-btn" className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                  Get Started
                </button>
              </span>
            </div>
          </form>
        </div>

        <div className="md:col-span-1 col-span-0 hidden sm:block">
          <img src={Illustration} alt="illustration" />
        </div>
      </div>

      {openScoreModal && userId !== "" ? (
        <CreditScoreModal
          open={openScoreModal} 
          close={() => setOpenScoreModal(false)}
          userInfo={{
            ...formik.values, 
            amount: formik.values.amount.replace(/,/g, ''), 
            id: userId
          }} />
      ) : null}

      <Script
        url={process.env.REACT_APP_MONO_URL}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
    </div>
  )
}

const validationSchema = Yup.object({
  email: Yup.string().email('Please provide a valid email').required('Email is required'),
  name: Yup.string().required('Name is required'),
  amount: Yup.string().required('Please input amount you want to access')
})

export default LaunchScreen