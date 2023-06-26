import { StaticMixedComponentBuilder } from "ctx-ptn/builders/components/stc-mxd-cmp-bld";
import { ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";

export class ProfileBuilder extends StaticMixedComponentBuilder<Profile, {}> {
  constructor(useModelSelector: () => Profile, builders: {
    periodList: ListComponentBuilder<Period, {}>,
    iconicList: ListComponentBuilder<IconicItem, {}>,
    skillList: ListComponentBuilder<RatedSkill, {}>
  }) {
    super(useModelSelector);
    Object.assign(this.typeBuilders, builders);
  }

  protected typeBuilders: {
    periodList: null | ListComponentBuilder<Period, {}>,
    iconicList: null | ListComponentBuilder<IconicItem, {}>,
    skillList: null | ListComponentBuilder<RatedSkill, {}>
  } = {
    periodList: null,
    iconicList: null,
    skillList: null
  }

  protected typeMaps = {
    profile: 'iconicList',
    languages: 'skillList',
    technologies: 'iconicList',
    theory: 'iconicList',
    degrees: 'periodList'
  }
}

/*

Old version for comparison (prior to static mixing).


import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { isIconicListChecksFirst, isPeriodListChecksFirst, isRatedSkillListChecksFirst } from "types/checks/profile";
import { IconicListBuilder } from "./IconicItem";
import { PeriodListBuilder } from "components/Period";
import { RatedSkillListBuilder } from "./RatedSkill";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";

export default class ProfileBuilder extends ComponentBuilder<Profile, {}> {
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
  
  get hasRequired() {
    if (!super.hasRequired) return false;
    for (const key in this.builders) {
      if (this.builders[key as keyof typeof this.builders] == null) return false;
    }
    return true;
  }
  
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

      const leaves = [];
      for (const key in model) {
        const chainSelector = (m: typeof model) => m[key as keyof typeof model]
        const leaf = chainSelector(model);

        let builder;
        if (isIconicListChecksFirst(leaf)) {
          builder = iconicBuilder;
        } else if (isPeriodListChecksFirst(leaf)) {
          builder = periodBuilder;
        } else if (isRatedSkillListChecksFirst(leaf)) {
          builder = skillBuilder;
        }

        builder && leaves.push(
          builder.addModelSelector(
            selectorChainer(useSelector, chainSelector as (m: typeof model) => DisplayList<IconicItem> & DisplayList<Period> & DisplayList<RatedSkill>)
          ).Component
        );
      }

      return (
        <div className="profile">
          {
            leaves.map((Item, index) => <Item key={index} />)
          }
        </div>
      );
    };
  };
}*/
