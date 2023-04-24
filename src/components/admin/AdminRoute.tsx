import { useAuth } from "src/contexts/AuthContext";

const AdminRoute = ({ children }: React.PropsWithChildren): React.ReactNode => {
  const { getIsAdmin } = useAuth();

  const isAdmin = getIsAdmin();

  // TODO: move this into useEffect
  getIsAdmin().then((isAdmin: boolean) => {
    console.log(">>> isAdmin: ", isAdmin);
  });

  // TODO: show loader while getIsAdmin is being called

  // TODO: if !isAdmin, show error

  return children;
}

export default AdminRoute;