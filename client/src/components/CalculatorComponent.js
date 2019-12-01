import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import calculator from "../helper/calculator";
import GradeComponent from "./GradeComponent";
import {connect} from "react-redux";

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
            name: '',
            grade: this.props.course ? this.props.course.grade : 0,
            percentage: this.props.course ? this.props.course.percentage : 0.0,
            needed: this.props.course ? this.props.course.needed : 0,
            courseWork: this.props.course ? this.props.course.courseWork : [],
            editing: [],
            saved: !this.props.course === undefined
        };
        this.numberInputProps = {
            className: this.props.classes.input,
            step: 'any',
            min: 0,
            max: 100
        };
    }

    onGradeChange = (e) => {
        if (e.target.value > 100 || e.target.value < 0) {
            return;
        }
        this.setState({
            ...this.state,
            grade: e.target.value,
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
    onNameChange = (e) => {
        this.setState({
            ...this.state,
            name: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        let needed = calculator.calculateRequired(this.state.grade, this.state.percentage, 50);
        (this.props.course || this.state.saved) ?
            this.props.updateCourse({...this.state, needed}) : this.props.addCourse({...this.state, needed});
        this.setState({
            ...this.state,
            needed: needed,
            saved: true
        })
    };

    newCourseWorkCallback = (index) => (course) => {
        let newEditing = [...this.state.editing];
        let newCourseWork = [...this.state.courseWork];
        newCourseWork.unshift(course);
        newEditing.splice(index, 1);
        this.setState(
            {
                ...this.state,
                courseWork: newCourseWork,
                editing: newEditing
            });
        if (this.state.saved) {
            this.props.updateCourse(this.state)
        }
    };

    updateCourseWorkCallback = (index) => (course) => {
        let newCourseWork = [...this.state.courseWork];
        newCourseWork[index] = course;
        this.setState({
            ...this.state,
            courseWork: newCourseWork
        });
        if (this.state.saved) {
            this.props.updateCourse(this.state)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.course) {
            return;
        }
        this.setState({
            ...prevState,
            grade: this.props.course.grade,
            percentage: this.props.course.percentage,
            needed: this.props.course.needed,
            courseWork: this.props.course.courseWork,
        })
    }

    render() {
        return (
            <div>
                {this.state.needed > 0 && <h2>You need {this.state.needed}% on the exam to pass the course</h2>}
                {this.state.needed < 0 && <h2>Sorry but you cannot pass this course :(</h2>}
                <form onSubmit={this.onSubmit}>
                    <label style={{color: "white"}}>
                        Course Name:
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
                            onChange={this.onNameChange}
                        />
                    </label>
                    <div style={{height: '25px'}}/>
                    <label style={{color: "white"}}>
                        Enter your term grade:
                        <TextField
                            style={{marginLeft: "15px"}}
                            inputProps={this.numberInputProps}
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
                            inputProps={this.numberInputProps}
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
                    <Button style={{backgroundColor: 'white'}}
                            onClick={() => this.setState({...this.state, editing: [...this.state.editing, {}]})}
                            color="secondary">Add Course Work</Button>
                    <Button style={{backgroundColor: 'white', marginLeft: '5px'}} type="submit"
                            color="secondary">Calculate</Button>
                </form>
                {this.state.editing.length !== 0 &&
                <div style={{backgroundColor: 'white', height: '1px', marginTop: '5px'}}/>}
                {this.state.editing.map((e, index) => (
                    <GradeComponent
                        key={index}
                        editing={true}
                        course={{
                            grade: 0,
                            mark: 0,
                            outOf: 0,
                            percentage: 0.0
                        }}
                        callback={() => this.newCourseWorkCallback(index)}
                    />
                ))}
                {(this.state.editing.length !== 0 || this.state.courseWork.length !== 0) &&
                <div style={{backgroundColor: 'white', height: '1px', marginTop: '5px'}}/>}
                {this.state.courseWork.map((e, index) => (
                    <GradeComponent
                        key={index}
                        course={{...e}}
                        editing={false}
                        callback={() => this.updateCourseWorkCallback(index)}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let courseName = state.course.map(e => e.name);
    if (ownProps.course) {
        let course = state.course.find(e => e.name === ownProps.course.name);
        return {courseName, course};
    }
    return {courseName}
};

const mapDispatchToProps = dispatch => {
    return {
        // dispatching actions returned by action creators
        addCourse: (data) => dispatch({
            course: {
                name: data.name,
                grade: data.grade,
                percentage: data.percentage,
                needed: data.needed,
                courseWork: data.courseWork,
            }, type: 'addCourse'
        }),

        updateCourse: (data) => dispatch({
            course: {
                name: data.name,
                grade: data.grade,
                percentage: data.percentage,
                needed: data.needed,
                courseWork: data.courseWork
            }, type: 'updateCourse'
        })
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CalculatorComponent));
