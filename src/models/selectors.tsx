import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { IconicItemBuilder, IconicListBuilder } from "components/sidebar/profile/IconicItem";
import { PeriodBuilder, PeriodListBuilder } from "components/Period";
import { RatedSkillBuilder, RatedSkillListBuilder } from "components/sidebar/profile/RatedSkill";
import ProfileBuilder from "components/sidebar/profile/Profile";
import SidebarBuilder from "components/sidebar/Sidebar";
import { useRootContext } from "./context";

const iconicListBuilder = new IconicListBuilder(undefined, new IconicItemBuilder());

const periodListBuilder = new PeriodListBuilder(undefined, new PeriodBuilder(undefined,
  selectorChainer(useRootContext, root => root.localeSettings)
));

const ratedSkillListBuilder = new RatedSkillListBuilder(undefined, new RatedSkillBuilder());

const profileBuilder = new ProfileBuilder(selectorChainer(useRootContext, root => root.cv.profile),
  iconicListBuilder,
  periodListBuilder,
  ratedSkillListBuilder
);

export const Sidebar = new SidebarBuilder(selectorChainer(useRootContext, root => root.cv.img), profileBuilder).Component;
