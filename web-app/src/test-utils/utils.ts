const withNoConsoleErrors = (callback: Function) => () => {
  const spy = jest.spyOn(global.console, 'error');
  callback();
  expect(spy).not.toHaveBeenCalled();
};

const sleep = async (time = 300) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};

type validationErrorType = {
  [key: string]: string[];
};

interface validationParamInterface {
  validationErrors?: validationErrorType;
}

const defaultParam = {
  error: ['dummy'],
};
const getAxiosValidationErrorResponse = ({
  validationErrors = defaultParam,
}: validationParamInterface) => {
  return {
    response: {
      status: 422,
      data: {
        errors: validationErrors,
        message: 'Test error',
      },
    },
  };
};

export { withNoConsoleErrors, getAxiosValidationErrorResponse, sleep };
