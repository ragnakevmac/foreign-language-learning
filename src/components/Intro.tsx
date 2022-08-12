import React from "react";

function Intro(props: {person: string}): JSX.Element {
    return <h1>Welcome, {props.person}!</h1>;
}

export default Intro;