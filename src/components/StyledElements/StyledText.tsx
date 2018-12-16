import React from "react";
interface TextSchema {
    text: string
}
class StyledText extends React.Component<TextSchema> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <p style={{ color: "#ffffff" }}>{this.props.text}</p>
        );
    }
}


export default StyledText;
