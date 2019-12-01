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
            course: this.props.course ? this.props.course : {
                name: '',
                grade: 0,
                percentage: 0.0,
                needed: 0,
                courseWork: []
            },
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
        let course = {...this.state.course, grade: e.target.value};
        this.setState({
            ...this.state,
            course
        })
    };

    onPercentageChange = (e) => {
        if (e.target.value > 100 || e.target.value < 0) {
            return;
        }
        let course = {...this.state.course, percentage: e.target.value};
        this.setState({
            ...this.state,
            course
        })
    };
    onNameChange = (e) => {
        let course = {...this.state.course, name: e.target.value};
        this.setState({
            ...this.state,
            course
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        let course = this.state.course;
        let needed = calculator.calculateRequired(course.grade, course.percentage, 50);
        let newCourse = {...course, needed};
        (this.props.course || this.state.saved) ?
            this.props.updateCourse(newCourse) : this.props.addCourse(newCourse);
        this.setState({
            ...this.state,
            saved: true
        })
    };

    newCourseWorkCallback = (index) => (courseWork) => {
        let newEditing = [...this.state.editing];
        let newCourseWork = [...this.state.course.courseWork];
        newCourseWork.unshift(courseWork);
        newEditing.splice(index, 1);
        let course = {...this.state.course};
        course.courseWork = newCourseWork;
        if (this.state.saved) {
            this.props.updateCourse(course);
            this.setState({
                ...this.state,
                editing: newEditing,
                course,
            });
        } else if(this.state.course.name!==''){
            this.props.addCourse(course);
            this.setState({
                ...this.state,
                editing: newEditing,
                course,
                saved: true
            });
        }
    };

    updateCourseWorkCallback = (index) => (courseWork) => {
        let newCourseWork = [...this.state.course.courseWork];
        newCourseWork[index] = courseWork;
        let course = {...this.state.course};
        course.courseWork = newCourseWork;
        if (this.state.saved) {
            this.props.updateCourse(course);
            this.setState({
                ...this.state,
                course,
            });
        } else if(this.state.course.name!==''){
            this.props.addCourse(course);
            this.setState({
                ...this.state,
                course,
                saved: true
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.course) {
            return;
        }
        let course = this.props.course;
        this.setState({
            ...prevState,
            course
        });
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
                        callback={this.newCourseWorkCallback(index)}
                    />
                ))}
                {(this.state.editing.length !== 0 || this.state.course.courseWork.length !== 0) &&
                <div style={{backgroundColor: 'white', height: '1px', marginTop: '5px'}}/>}
                {this.state.course.courseWork.map((e, index) => (
                    <GradeComponent
                        key={index}
                        course={{...e}}
                        editing={false}
                        callback={this.updateCourseWorkCallback(index)}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let courseName = state.course.map(e => e.name);
    console.log(state)
    if (ownProps.location) {
        if(ownProps.location.state){
            if(ownProps.location.state.course){
                let course = state.course.find(e => e.name === ownProps.course.name);
                return {courseName, course};
            }
        }
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
