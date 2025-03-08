import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirect to login if not authenticated
        } else if (requireAdmin && user.email !== "malik4@test.com") {
            navigate("/unauthorized"); // Redirect unauthorized users
        }
    }, [user, navigate, requireAdmin]);

    return user ? <>{children}</> : null;
};

export default ProtectedRoute;
