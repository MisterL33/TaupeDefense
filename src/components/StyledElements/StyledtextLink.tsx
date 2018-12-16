import React from "react";
interface StyledTextLinkSchema {
    clickEvent: any,
    text: string
}
class StyledTextLink extends React.Component<StyledTextLinkSchema> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <p style={{ color: "#ffffff" }}>
                <u>
                    <a onClick={this.props.clickEvent}>{this.props.text}</a>
                </u >
            </p >
        );
    }
}


export default StyledTextLink;