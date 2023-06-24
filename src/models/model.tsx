

const cv: Cv = {
  name: 'Olesj Bilous',
  profession: 'Software developer',
  img: 'logo192.png',
  introduction: '',
  profile: {
    profile: [{
      icon: 'github',
      content: 'github.com'
    }, {
      icon: 'map-marker',
      content: 'Gent, België'
    }],
    languages: [{
      skill: 'Nederlands',
      rating: 5,
      scale: 5
    }, {
      skill: 'Français',
      rating: 3,
      scale: 5
    }],
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
