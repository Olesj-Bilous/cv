import { ReactNode, createContext, useContext } from 'react';

export const buildContext = function<T>() {
  const context = createContext<null|T>(null);
  const useModelContext = modelHookBuilder(context);

  return {
    context,
    ModelProvider: modelProviderBuilder(context),
    consumerBuilder: modelConsumerBuilder(useModelContext)
  }
}

export const selectorChainer = function <T, U>(useSelector: () => T, chainSelector: (model: T) => U) {
  return function useChainSelector() {
    return chainSelector(useSelector());
  }
}

const modelHookBuilder = function <TRoot>(context: React.Context<null | TRoot>) {
  return () => {
    const model = useContext(context);
    if (model == null) throw new Error('The ModelProvider was not given a model to provide.');
    return model;
  }
}

const modelProviderBuilder = function<T>(context: React.Context<null|T>) {
  return (props: { model: T, children?: ReactNode }) => (
    <context.Provider value={props.model}>
      {props.children}
    </context.Provider>
  )
}

const modelConsumerBuilder = function<TRoot>(useModelContext: () => TRoot) {
  return function<TLeaf>(selector: (root: TRoot) => TLeaf) {
    return (
      consumer: (
        useSelector: () => TLeaf
      ) => <TProps>(
        props: TProps
      ) => JSX.Element
    ) => consumer(function useSelector() { return selector(useModelContext()); });
  }
}
