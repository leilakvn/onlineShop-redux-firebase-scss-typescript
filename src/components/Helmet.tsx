import React from "react";

type Props = {
  children: any;
  title: string | undefined;
};
export const Helmet = (props: Props) => {
  document.title = "myproject-" + props.title;
  return <div className="w-100">{props.children}</div>;
};
