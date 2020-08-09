import React from 'react'
import { removeAllButLast } from '../utils/lib'

const CurrencyInput: React.FC<any> = (props) => {
  const [state, setState] = React.useState<any>({
    value: props.value,
    formatedValue: "0.00"
  })

  function onChange(e: any) {
    e.persist();
    const el = e.target;
    const inputValue = el.value;

    setState({
      value: (inputValue) ? removeAllButLast(inputValue.replace(/[^\d,.]/g, '').replace(',', '.'), '.') : '',
      formattedValue: el.value,
    });
  }

  function onFocus(e: any) {
    e.persist();
    const el = e.target;
    const { value } = state;

    el.value = value;
  }

  function onKeyDown(e: any) {
    e.persist();
    const el = e.target;
    const inputValue = el.value;
    const regex = /^[0-9]+(\.,){1}[0-9]+$/;

    if (!regex.test(inputValue)) {
      el.value = removeAllButLast(inputValue.replace(/[^\d,.]/g, '').replace(',', '.'), '.');
      return false;
    }
    el.value = removeAllButLast(inputValue.replace(/[^\d,.]/g, '').replace(',', '.'), '.');
    return true;
  }

  function onBlur(e: any) {
    const el = e.target;
    const { value, currency } = state;

    el.value = props.intl.formatNumber(value, {
      style: 'currency',
      currency,
    });

    setState((state: any) => ({
      ...state, 
      value: value ? Number(value).toFixed(2) : '',
      formattedValue: el.value,
    }));
  }

  React.useEffect(() => {
    const valueObj = {
      formattedValue: state.formattedValue,
      value: state.value,
      floatValue: parseFloat(state.value),
    };

    if (props.onChange) props.onChange(valueObj);
  }, [state, props])

  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm sm:leading-5">
          &#8358;
        </span>
      </div>
      <input 
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...props} 
        id="amount" 
        className="form-input py-3 block w-full pl-7 pr-12 sm:text-sm sm:leading-5" 
        placeholder="0.00" 
        aria-describedby="amount-currency"/>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm sm:leading-5" id="amount-currency">
          NGN
        </span>
      </div>
    </div>
  )
}

export default CurrencyInput