import { Button } from "@/components/ui/button";
import { useCount } from "@/hooks/sample";
import { useAuth } from "@/hooks/use-auth";

export default function Sample() {
  return (
    <div className="flex flex-col gap-2">
      <CountResult />
      <CountActions />
    </div>
  );
}

const CountResult = () => {
  const count = useCount((state) => state.count);
  return <h1>Count: {count}</h1>;
};

const CountActions = () => {
  const { increateCount, decreaseCount, disableIncrease } = useCount(
    (state) => state
  );

  const { login, logout, isLoggedIn } = useAuth((state) => state);

  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <div className="space-x-1">
        <Button disabled={disableIncrease} onClick={increateCount}>
          +
        </Button>
        <Button onClick={decreaseCount}>-</Button>
      </div>
      {!isLoggedIn ? (
        <Button onClick={login}>Login</Button>
      ) : (
        <Button
          onClick={() => {
            logout();
            useAuth.persist.clearStorage();
          }}
        >
          Logout
        </Button>
      )}
    </div>
  );
};
