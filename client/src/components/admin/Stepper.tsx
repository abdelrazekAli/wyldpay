import { Circle } from "./Circle";
import "../../styles/stepper.sass";
import { PayForm } from "./PayForm";
import { RestForm } from "./RestaurantForm";
import { FoodsForm } from "./FoodsForm";
import { useState, useEffect } from "react";
import { RegisterForm } from "./RegisterForm";
import { CategoryForm } from "./CategoryForm";

export const Stepper = () => {
  const [circle] = useState<number>(5);
  const [width, setWidth] = useState<number>(0);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    // Set progress width
    setWidth((100 / (circle - 1)) * active);

    // Set scroll to top
    window.scrollTo(0, 0);
  }, [active, circle]);

  // Set progress nodes
  const nodes: React.ReactElement[] = [];
  for (let i = 0; i < circle; i++) {
    nodes.push(<Circle active={i <= active ? true : false} key={i} />);
  }

  return (
    <>
      <div className="stepper-container">
        <div className="content">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${width}%` }}></div>
            {nodes}
          </div>
          {/* Registeration form */}
          {active === 3 && (
            <RegisterForm onClick={() => setActive(active + 1)} />
          )}
        </div>
      </div>
      {/* Restaurant form */}
      {active === 0 && <RestForm onClick={() => setActive(active + 1)} />}
      {/* Categories form */}
      {active === 1 && <CategoryForm onClick={() => setActive(active + 1)} />}
      {/* Foods form */}
      {active === 2 && <FoodsForm onClick={() => setActive(active + 1)} />}
      {/* Payment form */}
      {active === 4 && <PayForm />}
    </>
  );
};
