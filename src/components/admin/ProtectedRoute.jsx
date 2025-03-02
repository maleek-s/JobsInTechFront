import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            // If no user is logged in, redirect to the homepage or login page
            navigate("/");
        } else if (user.email !== "malik4@test.com") {
            // If the logged-in user's email does not match, redirect to an unauthorized page
            navigate("/unauthorized"); // Customize this as needed
        }
    }, [user, navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
