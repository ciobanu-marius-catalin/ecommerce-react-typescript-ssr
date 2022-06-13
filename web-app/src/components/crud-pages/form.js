import { Alert, Button, Form } from 'react-bootstrap';
import {
  useReducer,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import _ from 'lodash';
import {
  useDeepCallback,
  useDeepMemo,
  errorContext,
  useErrorCatcher,
} from '@core';
import {
  CrudContext,
  useCrudContext,
  useCrudContextValue,
} from './crud-context';
import { axios } from '@core';
import { useRouter } from 'next/router';

const CrudForm_ = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    settings = [],
    method = 'post',
    loadData,
    onBeforeSubmit,
    listApiPath,
  } = props;
  const { apiPath } = useCrudContext();
  const { error, setError } = useErrorCatcher();
  const { errorMessage, validationErrors } = error || {};
  const [formData, setFormData] = useReducer((state, action) => {
    return _.merge({}, state, action);
  }, {});
  const router = useRouter();
  /**
   *  loadData will not change at runtime so the hook will not be called conditionally after the component has mounted.
   *React will not allow hooks to be called conditionally but if the condition is the same for the component runtime
   *then it's not problem.
   *We need this because for update we need to load the initial data but for create we don't need this. We'll reuse the form
   *component for both cases
   */
  let fetchedData = {};
  if (loadData) {
    fetchedData = useFetchData(apiPath);
    let columns = settings.map((item) => item.setting);
    fetchedData = _.pick(fetchedData, columns);
  }
  const memoizedFetchedData = useDeepMemo(() => {
    return fetchedData;
  }, [fetchedData]);

  useEffect(() => {
    if (!_.isEqual(formData, fetchedData)) {
      setFormData(fetchedData);
    }
  }, [memoizedFetchedData]);

  const getValue = useDeepCallback(
    (path, defaultValue) => {
      return _.get(formData, path, defaultValue);
    },
    [formData]
  );
  const setValue = useDeepCallback(
    (path) => (newValue) => {
      let data = _.get(newValue, ['target', 'value']);
      let changes = _.set({}, path, data);
      setFormData(changes);
    },
    [formData, setFormData]
  );

  const settingsWithData = useDeepMemo(() => {
    return settings.map((item = {}) => {
      const setting = item?.setting;
      return _.merge({}, item, {
        value: getValue(setting),
        onChange: setValue(setting),
      });
    });
  }, [settings, formData, setValue]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let path = `${apiPath}`;
    let data = formData;
    if (onBeforeSubmit) {
      data = onBeforeSubmit(_.cloneDeep(formData));
    }

    try {
      let response = await axios({
        method: method,
        url: path,
        data: data,
      });
      router.push(listApiPath);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <div className="gravity-crud-form__container">
      <Form>
        {errorMessage && (
          <Alert className="w-100" variant="danger">
            {errorMessage}
          </Alert>
        )}
        {settingsWithData.map(
          ({ label, type, setting, ...props } = {}, index) => {
            let validationError = _.get(validationErrors, [setting, 0]);
            return (
              <Form.Group key={index} className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  isInvalid={submitted && validationError}
                  {...props}
                ></Form.Control>
                {validationError && (
                  <Form.Control.Feedback type="invalid">
                    {validationError}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            );
          }
        )}

        <Button onClick={onSubmit}>Save</Button>
      </Form>
    </div>
  );
};

function useFetchData(path) {
  const [data, setData] = useState({});
  const { setError } = useErrorCatcher();
  async function fetchData() {
    let fetchResult = await axios.get(path, {
      params: {},
    });
    let fetchedData = _.get(fetchResult, 'data');
    if (fetchedData) {
      setData(fetchedData);
    }
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      setError(e);
    }
  }, [path]);

  return data;
}

const CrudForm = (props) => {
  const { localApiPath } = props;
  const contextValue = useCrudContextValue(localApiPath);
  return (
    <CrudContext.Provider value={contextValue}>
      <CrudForm_ {...props} />
    </CrudContext.Provider>
  );
};

export { CrudForm };
