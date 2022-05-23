import { useState } from 'react';

import _ from 'lodash';

type GetValueType = (path: string) => string;

type SetValueType = (path: string) => (newValue: string) => void;

type getFormDataType = (path: string) => GetFormDataReturnType;

interface GetFormDataReturnType {
  value: string;
  onChange: (newValue: any) => void;
}

export interface UseFormDataReturnType<FormType> {
  form: FormType;
  getFormData: getFormDataType;
}

function useFormData<FormType>(
  defaultValue: FormType
): UseFormDataReturnType<FormType> {
  const [form, setForm] = useState<FormType>(defaultValue);
  const setValue: SetValueType = (path: string) => (newValue: string) => {
    const newForm = _.cloneDeep(form);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
