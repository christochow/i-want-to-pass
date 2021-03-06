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
            ...this.props.course,
            editing: this.props.editing
        }
    }

    onMarkChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) {
            return
        }
        this.setState({
            ...this.state,
            mark: val,
        })
    };

    onOutOfChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) {
            return
        }
        this.setState({
            ...this.state,
            outOf: val,
        })
    };

    onPercentageChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) {
            return
        }
        if (val > 100 || val < 0) {
            return;
        }
        this.setState({
            ...this.state,
            percentage: val,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let grade = calculator.calculateGrade(this.state.mark, this.state.outOf);
        this.setState({
            ...this.state,
            grade,
            editing: false
        });
        this.props.callback({
            name: this.state.name,
            grade,
            mark: this.state.mark,
            outOf: this.state.outOf,
            percentage: this.state.percentage,
            id: this.state.id
        });
    };

    onNameChange = (e) => {
        this.setState({
            ...this.state,
            name: e.target.value
        })
    };

    render() {
        return (
            <div style={{margin: '15px'}}>
                {!this.state.editing && <div style={{paddingLeft: '50px'}}>
                    {this.props.index}. Name: {this.state.name}, Grade: {this.state.grade},
                    Weighting: {this.state.percentage}%
                    <Button style={{marginLeft:'5px', marginRight:'5px', color: '#A0A0A0'}} onClick={() => this.setState({...this.state, editing: true})}>
                        Edit
                    </Button>
                    <Button style={{color: '#A0A0A0'}} onClick={() => this.props.deleteCallback()}>
                        Delete
                    </Button>
                </div>}
                {this.state.editing && <form onSubmit={this.onSubmit}>
                    <label style={{color: "white"}}>
                        Name:
                        <TextField
                            style={{marginLeft: "15px"}}
                            inputProps={{
                                className: this.props.classes.input,
                            }}
                            InputLabelProps={{
                                className: this.props.classes.label
                            }}
                            type="string"
                            required
                            defaultValue={this.props.course.name}
                            onChange={this.onNameChange}
                        />
                    </label>
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
                        Weighting:
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
                    <Button style={{backgroundColor: 'white', marginLeft: '10px'}} type="submit"
                            color="secondary">Save</Button>
                    <Button style={{backgroundColor: 'white', marginLeft: '5px'}}
                            onClick={() => this.props.cancelCallback ?
                                this.props.cancelCallback() :
                                this.setState({...this.props.course, editing: false})}
                            color="secondary">Cancel</Button>
                </form>}
            </div>
        );
    }
}

export default withStyles(styles)(GradeComponent);
