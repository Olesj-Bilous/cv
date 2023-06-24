const Title = (props: { mainTitle: string, subTitle?: string }) => (
    <div className="title-container">
      <div className="main-title">{props.mainTitle}</div>
      {props.subTitle && (<div className="sub-title">{props.subTitle}</div>)}
    </div>
  );

export default Title;
