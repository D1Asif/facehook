import React from "react"

export default function Field({ label, children, htmlFor, error }) {
    const id = htmlFor || getChildId(children);
    return (
        <div className="form-control">
            {label && <label htmlFor={id} className="auth-label">{label}</label>}
            {children}
            {!!error && <p role="alert" className="text-red-600">{error.message}</p>}
        </div>
    )
}

function getChildId(children) {
    const child = React.Children.only(children);

    if ("id" in child.props) {
        return child.props.id;
    }
}

