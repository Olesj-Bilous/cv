interface Profile {
  profile: DefaultDisplayList<IconicItem>,
  languages: DefaultDisplayList<RatedSkill>,
  technologies: DefaultDisplayList<IconicItem>,
  theory: DefaultDisplayList<IconicItem>,
  degrees: DefaultDisplayList<DefaultPeriodHeader>
}

type IconicItem = {
  icon: string,
  content: string
}
  
interface RatedSkill {
  skill: string,
  rating: number,
  scale: number
}

