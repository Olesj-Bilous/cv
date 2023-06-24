

const cv: Cv = {
  img: 'logo192.png',
  profile: {
    profile: {
      title: 'Profiel',
      items: [{
        icon: 'github',
        content: 'github.com'
      }, {
        icon: 'map-marker',
        content: 'Gent, België'
      }]
    },
    languages: {
      title: 'Talen',
      items: [{
        skill: 'Nederlands',
        rating: 5,
        scale: 5
      }, {
        skill: 'Français',
        rating: 3,
        scale: 5
      }]
    },
    technologies: {
      title: 'Technologieën',
      items: []
    },
    theory: {
      title: 'Theorie',
      items: []
    },
    degrees: {
      title: 'Diploma\'s',
      items: [{
        mainTitle: 'Programmeren met C#',
        subTitle: 'VDAB',
        startDate: new Date(2021, 5),
        formatOptions: { year: 'numeric'}
      }]
    } 
  },
  main: {
    title: 'Olesj Bilous',
    subtitle: 'Software developer',
    introduction: 'I delight in recursion.',
    items: [{
      title: 'Ervaring',
      items: []
    }, {
      title: 'Projecten',
      items: []
    }]
  }
}

export const model: CvDocument = {
  cv,
  localeSettings: {
    locales: 'nl-BE',
    present: 'heden'
  }
}
