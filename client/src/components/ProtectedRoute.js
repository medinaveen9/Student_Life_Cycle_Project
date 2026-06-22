
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, roles, children }) => {

  console.log("USER OBJECT:", user);

  if (!user) {
    console.log("USER IS NULL");
    return <Navigate to="/login" replace />;
  }

  console.log("USER ROLE:", user.role);

  if (roles && !roles.includes(user.role)) {
    console.log("ACCESS DENIED");

    return (
      <div>
        🚫 ACCESS DENIED - ROLE: {user.role}
      </div>
    );
  }


  return children;
};
 export default ProtectedRoute;