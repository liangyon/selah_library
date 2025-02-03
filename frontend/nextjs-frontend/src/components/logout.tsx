import { useAuth } from "@/contexts/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
}