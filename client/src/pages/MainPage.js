import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import CalculatorComponent from "../components/CalculatorComponent";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            room: '',
            url: ''
        };
    }

    onClick = () => {
        this.setState({
            ...this.state,
            editing: !this.state.editing
        })
    };

    render() {
        return (
            <div style={{padding:'2vh'}}>
                <div style={{height: '25vh'}}/>
                <h2>I Want To Pass</h2>
                {!this.state.editing && <Button color="primary" onClick={this.onClick}>Add a new course</Button>}
                {this.state.editing && <CalculatorComponent/>}
            </div>
        )
    };
}

export default MainPage;
