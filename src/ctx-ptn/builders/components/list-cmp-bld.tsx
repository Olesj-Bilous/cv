import { ComponentBuilder } from "./cmp-bld";
import { selectorChainer } from "../context-builder";
import Title from "components/Title";

export abstract class ListComponentBuilder<TItem> extends ComponentBuilder<DisplayList<TItem>> {
  constructor(useModelSelector?: () => DisplayList<TItem>, itemBuilder?: ComponentBuilder<TItem>) {
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
        <section className={model.className ?? model.title.replaceAll(/[^a-zA-Z\s]+/g, '').replaceAll(/\s+/g, '-').toLowerCase()}>
          <Title mainTitle={model.title} subTitle={model.subtitle} />
          {model.introduction && (
            <div>
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
