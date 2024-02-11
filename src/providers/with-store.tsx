import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const withStore = <T extends Record<string, unknown>>(
  Component: FC<T>
) =>
  function props(props: T) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
