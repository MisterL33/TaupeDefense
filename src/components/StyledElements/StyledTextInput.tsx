import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import pink from "@material-ui/core/colors/pink";
const styles: any = ({
    input: {
        color: "white"
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    cssLabel: {
        color: "white",

        "&$cssFocused": {
            color: "white"
        }
    },
    cssFocused: {},
    cssUnderline: {
        "&": {
            borderBottomColor: pink[200]
        },
        "&:before": {
            borderBottomColor: pink[200]
        },
        "&:after": {
            borderBottomColor: pink[200]
        }
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: pink[200]
        }
    },
    notchedOutline: {},
    bootstrapFormLabel: {
        fontSize: 18
    }
});

interface InputSchema {
    placeholder: string,
    value: string
}
class StyledTextInput extends React.Component<InputSchema & { classes: any } & any> {
    state = {
        text: ""
    }
    constructor(props: any) {
        super(props)
    }
    handleText = (event: any) => {
        if (this.props.placeholder === 'Login') {
            this.props.handleChangeUsername(event)
        } else {
            this.props.handleChangePassword(event)
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container} style={{ width: "100%" }}>
                <FormControl className={classes.margin} style={{ width: "100%" }}>
                    <InputLabel
                        style={{ width: "100%" }}
                        htmlFor="custom-css-standard-input"
                        classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused

                        }}
                    >
                        {this.props.placeholder}
                    </InputLabel>
                    <Input
                        id="custom-css-standard-input"
                        classes={{
                            underline: classes.cssUnderline
                        }}
                        style={{ color: "white", width: "100%" }}
                        value={this.props.value}
                        onChange={this.handleText}
                    />
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(StyledTextInput);
