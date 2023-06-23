import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { isIconicListChecksFirst, isPeriodListChecksFirst, isRatedSkillListChecksFirst } from "../../types/checks/profile";
import { IconicListBuilder } from "./iconic-items/IconicItem";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { PeriodListBuilder } from "components/Period";
import { RatedSkillListBuilder } from "./RatedSkill";

export class ProfileBuilder extends ComponentBuilder<Profile> {
  constructor(useModelSelector: () => Profile,
    iconicListBuilder?: IconicListBuilder,
    periodListBuilder?: PeriodListBuilder,
    skillListBuilder?: RatedSkillListBuilder
  ) {
    super(useModelSelector);
    this.builders.iconicListBuilder = iconicListBuilder ?? null;
    this.builders.periodListBuilder = periodListBuilder ?? null;
    this.builders.skillListBuilder = skillListBuilder ?? null;
  }

  protected builders: {
    iconicListBuilder: null | IconicListBuilder,
    periodListBuilder: null | PeriodListBuilder,
    skillListBuilder: null | RatedSkillListBuilder
  } = {
    iconicListBuilder: null,
    periodListBuilder: null,
    skillListBuilder: null
  }
  
  //get hasRequired() {
  //  if (!super.hasRequired) return false;
  //  for (const key in this.builders) {
  //    if (this.builders[key as keyof typeof this.builders] == null) return false;
  //  }
  //  return true;
  //}
  
  setIconicListBuilder(builder: IconicListBuilder) {
    const clone = this.clone();
    clone.builders.iconicListBuilder = builder;
    return clone;
  }

  setPeriodListBuilder(builder: PeriodListBuilder) {
    const clone = this.clone();
    clone.builders.periodListBuilder = builder;
    return clone;
  }

  setSkillListBuilder(builder: RatedSkillListBuilder) {
    const clone = this.clone();
    clone.builders.skillListBuilder = builder;
    return clone;
  }

  get Component() {
    this.checkRequired();
    const useSelector = this.useModelSelector!;
    const iconicBuilder = this.builders.iconicListBuilder!;
    const periodBuilder = this.builders.periodListBuilder!;
    const skillBuilder = this.builders.skillListBuilder!;

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
        } else if (isRatedSkillListChecksFirst(section)) {
          builder = skillBuilder;
        }

        builder && sections.push(
          builder.addModelSelector(
            selectorChainer(useSelector, chainSelector as (m: typeof model) => IconicItem[] & Period[] & RatedSkill[])
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
