import { buildContext } from "ctx-ptn/builder/builder";

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

export const { context, ModelProvider, consumerBuilder } = buildContext<Cv>();
