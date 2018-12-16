import React from "react";

class StyledTextBold extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <b>
                <p style={{ color: "#ffffff" }}>
                    props.text
                </p>
            </b>
        );
    }
}


export default StyledTextBold;
