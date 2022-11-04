import "../../../styles/stepper.sass";
import { useState, useEffect } from "react";
import { ItemsForm } from "../forms/ItemsForm";
import { StepperCircle } from "./StepperCircle";
import { RestForm } from "../forms/RestaurantForm";
import { RegisterForm } from "../forms/RegisterForm";
import { CategoryForm } from "../forms/CategoryForm";
import { SubscriptionsPlans } from "../dashboard/SubscriptionsPlans";

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
    nodes.push(<StepperCircle active={i <= active ? true : false} key={i} />);
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
          {active === 0 && (
            <RegisterForm onClick={() => setActive(active + 1)} />
          )}
        </div>
      </div>
      {/* Restaurant form */}
      {active === 1 && <RestForm onClick={() => setActive(active + 1)} />}
      {/* Categories form */}
      {active === 2 && (
        <CategoryForm
          onClick={() => setActive(active + 1)}
          onSkip={() => setActive(active + 2)}
        />
      )}
      {/* Foods form */}
      {active === 3 && <ItemsForm onClick={() => setActive(active + 1)} />}
      {/* Payment form */}
      {active === 4 && <SubscriptionsPlans />}
    </>
  );
};
