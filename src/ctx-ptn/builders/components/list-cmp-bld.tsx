import { ComponentBuilder } from "./cmp-bld";
import { selectorChainer } from "../context-builder";
import Title from "components/Title";
import { toKebabCase } from "utils/format-string";

export abstract class ListComponentBuilder<TItem, TProps> extends ComponentBuilder<DisplayList<TItem>, TProps> {
  constructor(useModelSelector?: () => DisplayList<TItem>, itemBuilder?: ComponentBuilder<TItem, {}>) {
    super(useModelSelector);
    this.itemBuilder = itemBuilder ?? null;
  }

  protected itemBuilder: null | ComponentBuilder<TItem, {}> = null;

  addItemBuilder(builder: ComponentBuilder<TItem, {}>) {
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

    return function List(props: TProps) {
      const model = selector();

      return (
        <section className={model.className ?? toKebabCase(model.title) }>
          <Title mainTitle={model.title} subTitle={model.subtitle} />
          {model.introduction && (
            <div className="introduction">
              {model.introduction}
            </div>
          )}
          <ul>
            {
              model.items.map((item, index) => {
                const Item = builder.addModelSelector(
                  selectorChainer(selector, list => list.items[index])
                ).Component;

                return (
                  <li key={index}>
                    <Item />
                  </li>
                )
              })
            }
          </ul>
        </section>
      );
    }
  }
}
