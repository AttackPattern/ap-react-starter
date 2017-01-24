
export default store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  const { request, promise, types } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ undefined, type: REQUEST });

  return promise
    .then(
      response => response.json().then(result => {
        next({ result, type: SUCCESS });
      }),
    )
    .catch(
      error => next({ error, type: FAILURE }),
    );
};
