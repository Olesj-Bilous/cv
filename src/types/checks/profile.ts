export const isIconicItem = (value: any): value is IconicItem => value != null && 'icon' in value && 'content' in value;

export const isIconicListChecksFirst = (value: any): value is IconicItem[] => value != null && Array.isArray(value) && isIconicItem(value[0]);

export const isIconicListChecksAll = (value: any): value is IconicItem[] => value != null && Array.isArray(value) && value.reduce((acc: boolean, curr, currDex) => acc && isIconicItem(curr), true);