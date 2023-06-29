import { FreeComponentBuilder } from './cmp-bld';
import { selectorChainer } from '../context-builder';
import { NullableProps, NonNullableProps, isNonNullableProps, OptionalProps } from 'ctx-ptn/utils/derived-types';

export type PropertyBuilders<TModel, TBuilders> = {
  [Key in keyof TModel]: (builders: TBuilders) => FreeComponentBuilder<TModel[Key]>
}

export abstract class StaticMixedComponentBuilder<TModel, TBuilders> extends FreeComponentBuilder<TModel> {
  protected abstract builders: NullableProps<TBuilders>;
  protected abstract modelBuilderMap: PropertyBuilders<TModel, TBuilders>;
  setBuilders(update: OptionalProps<TBuilders>) {
    Object.assign(this.builders, update);
    return this;
  }

  get Component() {
    if (this.useModelSelector == null /*|| !isNonNullableProps(this.builders)*/) throw FreeComponentBuilder.missingRequiredError;
    const selector = this.useModelSelector;
    const builders = this.builders;
    
    const content: JSX.Element[] = [];
    for (const key in this.modelBuilderMap) {
      const builder = this.modelBuilderMap[key](builders as NonNullableProps<typeof builders>);
      if (builder == null) continue;
      const Component = builder.addModelSelector(selectorChainer(
        selector,
        model => model[key]
      )).Component;
      const element = (
        <div key={key}>
          <Component />
        </div>
      );
      content.push(element);
    }

    return function StaticMixedComponent() {
      return <>{content}</>
    }
  }
}
