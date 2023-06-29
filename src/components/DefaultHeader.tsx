import { FreeComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";

export default class DefaultHeaderBuilder extends FreeComponentBuilder<DefaultHeader> {
  get Component() {
    if (this.useModelSelector == null) throw FreeComponentBuilder.missingRequiredError;
    const selector = this.useModelSelector;

    return function DefaultHeader() {
      const model = selector();

      return (
        <>
          <div className="title-container">
            <div className="title">{model.title}</div>
            {model.subtitle && (<div className="subtitle">{model.subtitle}</div>)}
          </div>
          {model.introduction && (<div className="introduction">{model.introduction}</div>) }
        </>
      );
    }
  }
}
