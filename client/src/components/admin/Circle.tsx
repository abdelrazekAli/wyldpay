type CircleProps = {
  active: boolean;
};

export const Circle = ({ active }: CircleProps) => {
  return (
    <div className={active ? "circle active" : "circle"}>
      <span className={active ? "span-active" : ""}></span>
    </div>
  );
};
