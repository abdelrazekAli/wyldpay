type CircleProps = {
  active: boolean;
};

export const StepperCircle = ({ active }: CircleProps) => {
  return (
    <div className={active ? "circle active" : "circle"}>
      <span className={active ? "span-active" : ""}></span>
    </div>
  );
};
