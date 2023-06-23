import { PeriodHeaderBuilder, PeriodListBuilder } from "components/Period"; 
import { ProfileBuilder } from "components/sidebar/Profile";
import SidebarBuilder from "components/sidebar/Sidebar";
import { IconicItemBuilder, IconicListBuilder } from "components/sidebar/iconic-items/IconicItem";
import { buildContext, selectorChainer } from "ctx-ptn/builders/context-builder";

export const { useRootContext, ModelProvider } = buildContext<CvDocument>();

const iconicListBuilder = new IconicListBuilder(undefined, new IconicItemBuilder());

const periodListBuilder = new PeriodListBuilder(undefined, new PeriodHeaderBuilder(undefined,
  selectorChainer(useRootContext, root => root.localeSettings)
));

const profileBuilder = new ProfileBuilder(selectorChainer(useRootContext, root => root.cv.profile),
  iconicListBuilder, periodListBuilder
);

export const Sidebar = new SidebarBuilder(selectorChainer(useRootContext, root => root.cv.img), profileBuilder).Component;

const cv: Cv = {
  name: 'Olesj Bilous',
  profession: 'Software developer',
  img: 'logo192.png',
  introduction: '',
  profile: {
    profile: [{
      icon: 'fa fa-github',
      content: 'github.com'
    }, {
      icon: 'fa fa-country',
      content: 'Belgium'
    }],
    languages: [],
    technologies: [],
    theory: [],
    degrees: [{
      mainTitle: 'Programmeren met C#',
      subTitle: 'VDAB',
      startDate: new Date(2021, 5),
      endDate: new Date(2022, 4),
      formatOptions: { year: '2-digit', month: 'short'}
    }]
  },
  main: {
    experience: [],
    projects: []
  }
}

export const model: CvDocument = {
  cv,
  localeSettings: {
    locales: 'nl-BE',
    present: 'heden'
  }
}
