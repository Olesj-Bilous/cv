import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { isIconicListChecksFirst, isPeriodListChecksFirst } from "../../types/checks/profile";
import { IconicListBuilder } from "./iconic-items/IconicItem";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { PeriodListBuilder } from "components/Period";

export class ProfileBuilder extends ComponentBuilder<Profile> {
  constructor(useModelSelector: () => Profile, iconicListBuilder?: IconicListBuilder, periodListBuilder?: PeriodListBuilder) {
    super(useModelSelector);
    this.builders.iconicListBuilder = iconicListBuilder ?? null;
    this.builders.periodListBuilder = periodListBuilder ?? null;
  }

  protected builders: {
    iconicListBuilder: null | IconicListBuilder,
    periodListBuilder: null | PeriodListBuilder
  } = {
    iconicListBuilder: null,
    periodListBuilder: null
  }
  
  setIconicListBuilder(builder: IconicListBuilder) {
    const clone = this.clone();
    clone.builders.iconicListBuilder = builder;
    return clone;
  }

  setPeriodBuilder(builder: PeriodListBuilder) {
    const clone = this.clone();
    clone.builders.periodListBuilder = builder;
    return clone;
  }

  get Component() {
    this.checkRequired();
    const useSelector = this.useModelSelector!;
    const iconicBuilder = this.builders.iconicListBuilder!;
    const periodBuilder = this.builders.periodListBuilder!;

    return function Profile() {
      const model = useSelector();

      const sections = [];
      for (const key in model) {
        const chainSelector = (m: typeof model) => m[key as keyof typeof model]
        const section = chainSelector(model);

        let builder;
        if (isIconicListChecksFirst(section)) {
          builder = iconicBuilder;
        } else if (isPeriodListChecksFirst(section)) {
          builder = periodBuilder;
        }

        builder && sections.push(
          builder.addModelSelector(
            selectorChainer(useSelector, chainSelector as (m: typeof model) => IconicItem[] & Period[])
          ).Component
        );
      }

      return (
        <div className="profile">
          {
            sections.map((Item, index) => <Item key={index} />)
          }
        </div>
      );
    };
  };
}
