import { FreeComponentBuilder } from "./cmp-bld";
import { selectorChainer } from "../context-builder";
import Title from "components/DefaultHeader";
import { toKebabCase } from "utils/format-string";
import { DefaultHeadedComponentBuilder } from "./sng-cmp-bld";

export abstract class DefaultDisplayListBuilder<TItem> extends DefaultHeadedComponentBuilder<TItem[]> {}

export abstract class ListComponentBuilder<TItem> extends FreeComponentBuilder<TItem[]> {
  constructor(useModelSelector?: () => TItem[], itemBuilder?: FreeComponentBuilder<TItem>) {
    super(useModelSelector);
    this.itemBuilder = itemBuilder ?? null;
  }

  protected itemBuilder: null | FreeComponentBuilder<TItem> = null;

  setItemBuilder(builder: FreeComponentBuilder<TItem>) {
    this.itemBuilder = builder;
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
                  selectorChainer(selector, items => items[index])
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
