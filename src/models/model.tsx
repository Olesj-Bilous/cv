

const cv: Cv = {
  img: 'logo192.png',
  profile: {
    profile: {
      header: { title: 'Profiel' },
      body: [{
        icon: 'github',
        content: 'github.com'
      }, {
        icon: 'map-marker',
        content: 'Gent, België'
      }]
    },
    languages: {
      header: { title: 'Talen' },
      body: [{
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
      header: { title: 'Technologieën' },
      body: []
    },
    theory: {
      header: { title: 'Theorie' },
      body: []
    },
    degrees: {
      header: { title: 'Diploma\'s' },
      body: [{
        header: {
          title: 'Programmeren met C#',
          subtitle: 'VDAB'
        },
        body: {
          startDate: new Date(2021, 5),
          formatOptions: { year: 'numeric' }
        }
      }]
    } 
  },
  main: {
    header: {
      title: 'Olesj Bilous',
      subtitle: 'Software ontwikkelaar',
      introduction: 'I delight in recursion.'
    },
    body: [{
      header: { title: 'Ervaring' },
      body: [{
        header: {
          header: {
            title: 'Stage software ontwikkeling',
            subtitle: 'DMVH'
          },
          body: {
            startDate: new Date(2022, 6)
          }
        },
        body: [
          'Ik breidde de agenda van een backoffice web app uit met een zoekfunctie. Gebruikers kunnen complexe en dynamische queries naar agenda items op een gebruiksvriendelijke manier samenstellen en de resultaten handig overzien.',
          'Ik zorgde ervoor dat meerdere gebruikers kunnen deelnemen aan een agenda item, en stelde een veilig en consistent systeem van lees - en schrijfpermissies op voor gemeenschappelijke en private velden.'
        ]
      }]
    }, {
      header: { title: 'Projecten' },
      body: []
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
