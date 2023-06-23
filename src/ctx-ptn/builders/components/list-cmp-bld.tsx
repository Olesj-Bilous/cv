import { ComponentBuilder } from "./cmp-bld";
import { selectorChainer } from "../context-builder";

export abstract class ListComponentBuilder<TItem> extends ComponentBuilder<TItem[]> {
  constructor(useModelSelector?: () => TItem[], itemBuilder?: ComponentBuilder<TItem>) {
    super(useModelSelector);
    this.itemBuilder = itemBuilder ?? null;
  }

  protected itemBuilder: null | ComponentBuilder<TItem> = null;

  addItemBuilder(builder: ComponentBuilder<TItem>) {
    const clone = this.clone();
    clone.itemBuilder = builder;
    return this;
  }

  get hasRequired() {
    return super.hasRequired && this.itemBuilder != null;
  }

  get Component() {
    this.checkRequired();
    const selector = this.useModelSelector!;
    const builder = this.itemBuilder!;

    return function List() {
      const model = selector();

      return (
        <ul>
          {
            model.map((item, index) => {
              const Item = builder.addModelSelector(
                selectorChainer(selector, list => list[index])
              ).Component;

              return (
                <li key={index}>
                  <Item />
                </li>
              )
            })
          }
        </ul>
      );
    }
  }
}
