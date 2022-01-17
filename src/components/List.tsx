import React, { ReactElement } from "react";

interface ListProps {
  styles: {
    listStyle: string;
    itemStyle: string;
  };
  contents: ReactElement[];
}

const List: React.FC<ListProps> = ({ styles, contents }) => {
  return (
    <ul className={styles.listStyle}>
      {contents.map((item, i) => {
        return <li key={i}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
