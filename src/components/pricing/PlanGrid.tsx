import PlanCard, { type Plan } from "./PlanCard";

/**
 * Plans come from the admin-managed table, so the count is not fixed: up to
 * four share a row (narrower columns at four), and any more wrap onto the next.
 */
export default function PlanGrid({ plans }: { plans: Plan[] }) {
  const count = Math.max(plans.length, 1);
  const minColumn = count >= 4 ? 250 : 300;
  return (
    <ul
      className="mx-auto grid gap-5"
      style={{
        maxWidth: `${Math.min(count, 4) * (count >= 4 ? 300 : 400)}px`,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumn}px), 1fr))`,
      }}
    >
      {plans.map((plan) => (
        <li key={plan.id}>
          <PlanCard plan={plan} />
        </li>
      ))}
    </ul>
  );
}
