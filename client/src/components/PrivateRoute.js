import React from "react";
import { Route, Redirect } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {
    const token = localStorage.getItem("token")
    return (
        <Route  { ...rest }
            render={
                props => {
                    if (token) {
                        return <Component { ...props } />
                    } else {
                        return <Redirect to="/" />
                    } 
                }
            } />
    )
}
