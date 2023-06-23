import { ReactNode, createContext, useContext } from 'react';

export const buildContext = function <TRoot>() {
  const context = createContext<null | TRoot>(null);
  return {
    useRootContext: modelHookBuilder(context),
    ModelProvider: modelProviderBuilder(context)
  }
}

export const selectorChainer = function <TModel, TLeaf>(useSelector: () => TModel, chainSelector: (model: TModel) => TLeaf) {
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

const modelProviderBuilder = function<TRoot>(context: React.Context<null | TRoot>) {
  return (props: { model: TRoot, children?: ReactNode }) => (
    <context.Provider value={props.model}>
      {props.children}
    </context.Provider>
  )
}
