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
            grade: this.props.course.grade,
            mark: this.props.course.mark,
            outOf: this.props.course.outOf,
            percentage: this.props.course.percentage,
            editing: this.props.editing
        }
    }

    onMarkChange = (e) => {
        if (isNaN(parseInt(e.target.value))) {
            return
        }
        this.setState({
            ...this.state,
            mark: parseInt(e.target.value),
        })
    };

    onOutOfChange = (e) => {
        if (isNaN(parseInt(e.target.value))) {
            return
        }
        this.setState({
            ...this.state,
            outOf: parseInt(e.target.value),
        })
    };

    onPercentageChange = (e) => {
        if (e.target.value > 100 || e.target.value < 0) {
            return;
        }
        if (isNaN(parseInt(e.target.value))) {
            return
        }
        this.setState({
            ...this.state,
            percentage: parseInt(e.target.value),
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            editing: false
        });
        this.props.callback({
            grade: calculator.calculateGrade(this.state.mark, this.state.outOf),
            mark: this.state.mark,
            outOf: this.state.outOf,
            percentage: this.state.percentage
        });


    };

    render() {
        return (
            <div style={{margin: '15px'}}>
                {!this.state.editing && <div>
                    {this.props.index}. Grade: {this.state.grade}, worth {this.state.percentage}%
                    <Button onClick={() => this.setState({...this.state, editing: true})}>
                        Edit
                    </Button>
                    <Button onClick={() => this.props.deleteCallback()}>
                        Delete
                    </Button>
                </div>}
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
                            defaultValue={this.props.course.mark.toString()}
                            onChange={this.onMarkChange}
                        />
                    </label>
                    <label style={{color: "white", marginLeft: "15px"}}>
                        Out Of:
                        <TextField
                            style={{width: '50px', marginLeft: "5px"}}
                            inputProps={{
                                className: this.props.classes.input,
                                min: 1,
                                step: 'any'
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="number"
                            required
                            defaultValue={this.props.course.outOf.toString()}
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
                                min: 1,
                                max: 100
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="number"
                            required
                            defaultValue={this.props.course.percentage.toString()}
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
