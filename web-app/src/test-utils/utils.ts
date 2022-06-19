const withNoConsoleErrors = (callback: Function) => () => {
  const spy = jest.spyOn(global.console, 'error');
  callback();
  expect(spy).not.toHaveBeenCalled();
};

const getAxiosValidationErrorResponse = () => {
  return {
    response: {
      status: 422,
      data: {
        errors: ['test'],
        message: 'Test error',
      },
    },
  };
};

export { withNoConsoleErrors, getAxiosValidationErrorResponse};
