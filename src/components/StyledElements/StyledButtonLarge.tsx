import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { checkPropTypes } from "prop-types";

const styles = {
    cssRoot: {
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: "white",
        },

    },


}

interface ButtonSchema {
    text: string
    clickEvent: any
}
class StyledButton extends React.Component<ButtonSchema & { classes: any }> {
    constructor(props: any) {
        super(props)

    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Button
                    onClick={this.props.clickEvent}
                    className={classes.cssRoot}
                    size="small"
                    style={{ width: "100%", marginTop: "7%" }}>


                    {this.props.text}

                </Button>
            </div>
        );
    }
}


export default withStyles(styles)(StyledButton);
