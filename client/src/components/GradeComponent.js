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

class GradeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: 0,
            mark: 0,
            outOf: 0,
            percentage: 0.0,
            editing: true
        }
    }

    onMarkChange = (e) => {
        this.setState({
            ...this.state,
            mark: e.target.value,
        })
    };

    onOutOfChange = (e) => {
        this.setState({
            ...this.state,
            outOf: e.target.value,
        })
    };

    onPercentageChange = (e) => {
        if (e.target.value > 100 || e.target.value < 0) {
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
            grade: calculator.calculateGrade(this.state.mark, this.state.outOf),
            editing: false
        })
    };

    render() {
        return (
            <div style={{margin: '15px'}}>
                {!this.state.editing && <div>Grade: {this.state.grade}, worth {this.state.percentage}%</div>}
                {this.state.editing && <form onSubmit={this.onSubmit}>
                    <label style={{color: "white", marginLeft: "15px"}}>
                        Mark:
                        <TextField
                            style={{width: '50px', marginLeft: "5px"}}
                            inputProps={{
                                className: this.props.classes.input,
                                step: 'any',
                                min: 0,
                                max: this.state.outOf
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="number"
                            required
                            onChange={this.onMarkChange}
                        />
                    </label>
                    <label style={{color: "white", marginLeft: "15px"}}>
                        Out Of:
                        <TextField
                            style={{width: '50px', marginLeft: "5px"}}
                            inputProps={{
                                className: this.props.classes.input,
                                step: 'any'
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="number"
                            required
                            onChange={this.onOutOfChange}
                        />
                    </label>
                    <label style={{color: "white", marginLeft: "15px"}}>
                        Worth:
                        <TextField
                            style={{width: '50px', marginLeft: "5px"}}
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
                    <Button style={{backgroundColor: 'white', marginLeft: '5px'}} type="submit"
                            color="secondary">Calculate</Button>
                </form>}
            </div>
        );
    }
}

export default withStyles(styles)(GradeComponent);
