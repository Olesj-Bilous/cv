import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { IconicDisplayListBuilder, IconicItemBuilder, IconicListBuilder } from "components/sidebar/profile/IconicItem";
import { PeriodBuilder, PeriodDetailsBuilder, PeriodDetailsListBuilder, PeriodDetailsDisplayListBuilder, PeriodHeaderBuilder, PeriodHeaderDisplayListBuilder, PeriodHeaderListBuilder, SectionListBuilder, StringComponentBuilder, StringListBuilder } from "components/Period";
import { RatedSkillListBuilder, RatedSkillDisplayListBuilder, RatedSkillBuilder } from "components/sidebar/profile/RatedSkill";
import { ProfileBuilder } from "components/sidebar/profile/Profile";
import SidebarBuilder from "components/sidebar/Sidebar";
import { useRootContext } from "./context";
import MainBuilder from "components/main/Main";
import DefaultHeaderBuilder from "components/DefaultHeader";

const defaultHeaderBuilder = new DefaultHeaderBuilder();

const iconicListBuilder = new IconicDisplayListBuilder().setBuilders({
  headerBuilder: defaultHeaderBuilder.clone(),
  bodyBuilder: new IconicListBuilder().setItemBuilder(
    new IconicItemBuilder()
  )
});

const ratedSkillListBuilder = new RatedSkillDisplayListBuilder().setBuilders({
  headerBuilder: defaultHeaderBuilder.clone(),
  bodyBuilder: new RatedSkillListBuilder().setItemBuilder(
    new RatedSkillBuilder()
  )
});

const periodHeaderBuilder = new PeriodHeaderBuilder().setBuilders({
  headerBuilder: defaultHeaderBuilder.clone(),
  bodyBuilder: new PeriodBuilder().setLocaleSettingsSelector(selectorChainer(
    useRootContext,
    root => root.localeSettings
  ))
});

const periodHeaderListBuilder = new PeriodHeaderDisplayListBuilder().setBuilders({
  headerBuilder: defaultHeaderBuilder.clone(),
  bodyBuilder: new PeriodHeaderListBuilder().setItemBuilder(
    periodHeaderBuilder.clone()
  )
});

export const Profile = new ProfileBuilder(
  selectorChainer(
    useRootContext, 
    root => root.cv.profile
  ), {
    periodList: periodHeaderListBuilder,
    iconicList: iconicListBuilder,
    skillList: ratedSkillListBuilder
  }
).Component;

export const Sidebar = new SidebarBuilder(
  selectorChainer(
    useRootContext,
    root => root.cv.img
  )
).Component;

export const Main = new MainBuilder().addModelSelector(
  selectorChainer(
    useRootContext,
    root => root.cv.main
  )
).setBuilders({
  headerBuilder: defaultHeaderBuilder.clone(),
  bodyBuilder: new SectionListBuilder().setItemBuilder(
    new PeriodDetailsDisplayListBuilder().setBuilders({
      headerBuilder: defaultHeaderBuilder.clone(),
      bodyBuilder: new PeriodDetailsListBuilder().setItemBuilder(
        new PeriodDetailsBuilder().setBuilders({
          headerBuilder: periodHeaderBuilder.clone(),
          bodyBuilder: new StringListBuilder().setItemBuilder(
            new StringComponentBuilder()
          )
        })
      )
    }
    )
  )
}).Component;
