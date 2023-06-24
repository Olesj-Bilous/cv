

export const isIconicItem = (value: any): value is IconicItem => value != null && 'icon' in value && 'content' in value;

export const isIconicListChecksFirst = (value: any): value is IconicItem[] => isListOfTypeChecksFirst(value, isIconicItem);

export const isIconicListChecksAll = (value: any): value is IconicItem[] => isListOfTypeChecksAll(value, isIconicItem);

export const isPeriod = (value: any): value is Period => value != null && 'mainTitle' in value && 'subTitle' in value && 'startDate' in value;

export const isLongPeriod = (value: Period): value is LongPeriod => 'summary' in value && 'points' in value;

export const isPeriodListChecksFirst = (value: any): value is Period[] => isListOfTypeChecksFirst(value, isPeriod);

export const isPeriodListChecksAll = (value: any): value is Period[] => isListOfTypeChecksAll(value, isPeriod);

export const isRatedSkill = (value: any): value is RatedSkill => value != null && 'skill' in value && 'rating' in value && 'scale' in value;

export const isRatedSkillListChecksFirst = (value: any): value is RatedSkill[] => isListOfTypeChecksFirst(value, isRatedSkill);

export const isRatedSkillListChecksAll = (value: any): value is RatedSkill[] => isListOfTypeChecksAll(value, isRatedSkill);

const isListOfTypeChecksFirst = function <T>(value: any, checker: (val: any) => val is T) {
  return value != null && Array.isArray(value) && checker(value[0]);
}

const isListOfTypeChecksAll = function <T>(value: any, checker: (val: any) => val is T) {
  return value != null && Array.isArray(value) && value.reduce((acc: boolean, curr) => acc && checker(curr), true);
}
