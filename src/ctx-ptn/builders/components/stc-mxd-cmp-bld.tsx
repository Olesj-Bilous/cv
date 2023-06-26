import React from 'react';
import { selectorChainer } from '../context-builder';
import { ComponentBuilder } from './cmp-bld';
import { ListComponentBuilder } from './list-cmp-bld';

export abstract class StaticMixedComponentBuilder<TModel, TProps> extends ComponentBuilder<TModel, TProps> {
  protected abstract typeBuilders: { [key: string]: null | ComponentBuilder<TModel[keyof TModel], {}>};
  protected abstract typeMaps: Record<keyof TModel, keyof typeof this.typeBuilders>;

  get Component() {
    const selector = this.useModelSelector!;
    const content: JSX.Element[] = [];
    for (const key in this.typeMaps) {
      const builder = this.typeBuilders[this.typeMaps[key]];
      const Component = builder!.addModelSelector(selectorChainer(
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

    return function ClassComponent() {
      return <>{content}</>
    }
  }
}
