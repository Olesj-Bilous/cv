interface Profile {
  profile: DisplayList<IconicItem>,
  languages: DisplayList<RatedSkill>,
  technologies: DisplayList<IconicItem>,
  theory: DisplayList<IconicItem>,
  degrees: DisplayList<Period>
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

