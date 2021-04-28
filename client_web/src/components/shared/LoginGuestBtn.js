import { Button } from "components/shared/styling";
import { useHistory } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function LoginGuestBtn({ children, ...props }) {
  const history = useHistory();
  const auth = useAuth();

  function loginGuest() {
    auth.loginGuest();
    history.push("/diary");
  }

  return (
    <Button noBottomBorder onClick={loginGuest} {...props}>
      {children ? children : "Try as Guest"}
    </Button>
  );
}
