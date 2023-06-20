import { isIconicItem, isIconicListChecksFirst, isIconicListChecksAll } from "./profile";

test('types/checks: profile', () => {
  const correctItems = [{ icon: 'lol', content: 'haha' }, { icon: 'um', content: 'oof' }];
  const hasSomeIncorrectItems = [{ icon: 'lol', content: 'haha' }, { icon: 'um', contenttttt: 'oof' }];
  const incorrectIndex = 1;
  expect(isIconicItem(undefined)).toBe(false);
  expect(isIconicItem(null)).toBe(false);
  expect(isIconicItem(correctItems[0])).toBe(true);
  expect(isIconicItem(hasSomeIncorrectItems[incorrectIndex])).toBe(false);
  expect(isIconicListChecksFirst(correctItems)).toBe(true);
  expect(isIconicListChecksAll(correctItems)).toBe(true);
  expect(isIconicListChecksFirst(hasSomeIncorrectItems)).toBe(true);
  expect(isIconicListChecksAll(hasSomeIncorrectItems)).toBe(false);
})
