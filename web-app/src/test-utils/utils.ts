const withNoConsoleErrors = (callback: Function) => () => {
  const spy = jest.spyOn(global.console, 'error');
  callback();
  expect(spy).not.toHaveBeenCalled();
};

export { withNoConsoleErrors };
