import { useState } from 'react';

import _ from 'lodash';

interface FormType {
  email: string;
  password: string;
}

type GetValueType = (path: string) => string;

type SetValueType = (path: string) => (newValue: string) => void;

type getFormDataType = (path: string) => GetFormDataReturnType;

interface GetFormDataReturnType {
  value: string;
  onChange: (newValue: any) => void;
}

export interface UseFormDataReturnType {
  form: FormType;
  getFormData: getFormDataType;
}

function useFormData(): UseFormDataReturnType {
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
  });
  const setValue: SetValueType = (path: string) => (newValue: string) => {
    const newForm = _.cloneDeep(form);
    _.set(newForm, path, newValue);
    setForm(newForm);
  };
  const getValue: GetValueType = (path: string) => {
    return _.get(form, path);
  };

  const getFormData: getFormDataType = (
    path: string
  ): GetFormDataReturnType => {
    return {
      value: getValue(path),
      onChange: (newValue: any) => setValue(path)(newValue?.target?.value),
    };
  };

  return {
    form,
    getFormData,
  };
}

export { useFormData };
