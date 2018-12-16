import React from "react";
import PropTypes from "prop-types";
const PasswordField = require("material-ui-password-field")
import pink from "@material-ui/core/colors/pink";
// const styles: any = ({
//     input: {
//         color: "white"
//     },
//     container: {
//         display: "flex",
//         flexWrap: "wrap"
//     },
//     cssLabel: {
//         color: "white",

//         "&$cssFocused": {
//             color: "white"
//         }
//     },
//     cssFocused: {},
//     cssUnderline: {
//         "&:before": {
//             borderBottomColor: pink[200]
//         },
//         "&:after": {
//             borderBottomColor: pink[200]
//         }
//     },
//     cssOutlinedInput: {
//         "&$cssFocused $notchedOutline": {
//             borderColor: pink[200]
//         }
//     },
//     notchedOutline: {},
//     bootstrapFormLabel: {
//         fontSize: 18
//     }
// });


interface PasswordSchema {
}
class StyledTextPassword extends React.Component<PasswordSchema> {
    state: any = {
        mdp: ""
    }
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <PasswordField
                hintText="At least 8 characters"
                floatingLabelText="Enter your password"
                errorText="Your password is too short"
            />
        );
    }
}


export default StyledTextPassword;
