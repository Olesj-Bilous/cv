interface Profile {
  profile: IconicItem[],
  languages: RatedSkill[],
  technologies: IconicItem[],
  theory: IconicItem[],
  degrees: Period[]
}

type IconicItem = {
  icon: string,
  content: string
}
  
interface RatedSkill {
  skill: string,
  rating: number
}

const isRatedSkill = (value: any): value is RatedSkill => 'skill' in value && 'rating' in value;
