import { consumerChainer } from "ctx-ptn/builder/builder";

export function IconicListConsumer(useSelector: () => IconicItem[]) {
  return function IconicList() {
    const model = useSelector();
    return (
      <ul>
        {
          model.map((item, index) => {
            const Consumer = IconicItemConsumer(consumerChainer(useSelector, thisModel => thisModel[index]));
            return (<Consumer key={index} />);
          })
        }
      </ul>
    );
  };
}

export function IconicItemConsumer(useSelector: () => IconicItem) {
  return function IconicItem() {
    const model = useSelector();
    return (
      <li>
        <div className="icon-ctn">
          <span className={model.icon}></span>
        </div>
        <div className="content">
          {model.content}
        </div>
      </li>
    );
  }
}
