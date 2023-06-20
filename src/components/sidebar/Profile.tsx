import { selectorChainer } from "ctx-ptn/builder/builder";
import { isIconicListChecksFirst } from "../../types/checks/profile";
import { IconicListConsumer } from "./iconic-items/IconicItem";

export function ProfileConsumer(useSelector: () => Profile) {
  return function Profile() {
    const model = useSelector();
    const sections = [];
    for (const key in model) {
      const chainSelector = (m: typeof model) => m[key as keyof typeof model]
      const section = chainSelector(model);
      if (isIconicListChecksFirst(section)) {
        const Consumer = IconicListConsumer(selectorChainer(useSelector, chainSelector as (m: typeof model) => IconicItem[]));
        sections.push(Consumer);
      }
    }
    return <section>{sections.map((Item, index) => <Item key={index} />)}</section>
  };
}
