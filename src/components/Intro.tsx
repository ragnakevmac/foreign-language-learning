import React from "react";

function Intro(props: {person: string}): JSX.Element {
    return <h1>Evaluate My Translation! {props.person}</h1>;
}

export default Intro;