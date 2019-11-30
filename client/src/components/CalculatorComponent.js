import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import calculator from "../helper/calculator";

const styles = {
    input: {
        color: 'white'
    },
    label: {
        color: 'white'
    }
};

class CalculatorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: 0,
            percentage: 0.0,
            needed: 0
        }
    }

    onGradeChange = (e) => {
        if(e.target.value > 100 || e.target.value < 0){
            return;
        }
        this.setState({
            ...this.state,
            grade: e.target.value,
        })
    };

    onPercentageChange = (e) => {
        if(e.target.value > 100 || e.target.value < 0){
            return;
        }
        this.setState({
            ...this.state,
            percentage: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            needed: calculator.calculateRequired(this.state.grade, this.state.percentage, 50)
        })
    };

    render() {
        return (
            <div>
                {this.state.needed > 0 && <h2>You need {this.state.needed}% on the exam to pass the course</h2>}
                {this.state.needed < 0 && <h2>Sorry but you cannot pass this course :(</h2>}
                <form onSubmit={this.onSubmit}>
                    <label style={{color: "white"}}>
                        Enter your term grade:
                        <TextField
                            style={{marginLeft: "15px"}}
                            inputProps={{
                                className: this.props.classes.input,
                                step: 'any',
                                min: 0,
                                max: 100
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="number"
                            required
                            onChange={this.onGradeChange}
                        />
                    </label>
                    <div style={{height: '25px'}}/>
                    <label style={{color: "white"}}>
                        Enter your exam weighting:
                        <TextField
                            style={{marginLeft: "15px"}}
                            inputProps={{
                                className: this.props.classes.input,
                                step: 'any',
                                min: 0,
                                max: 100
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="number"
                            required
                            onChange={this.onPercentageChange}
                        />
                        %
                    </label>
                    <div style={{height: '15px'}}/>
                    <Button style={{backgroundColor: 'white'}} type="submit" color="secondary">Calculate</Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(CalculatorComponent);
