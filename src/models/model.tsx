import { buildContext } from "ctx-ptn/builder/builder";

export const { context, ModelProvider, selectorProvider } = buildContext<Cv>();

export const model: Cv = {
  name: 'Olesj Bilous',
  profession: 'Software developer',
  img: '',
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
    degrees: []
  },
  main: {
    experience: [],
    projects: []
  }
}
