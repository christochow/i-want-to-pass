import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import calculator from "../helper/calculator";
import GradeComponent from "../components/GradeComponent";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const styles = {
    input: {
        color: 'white'
    },
    label: {
        color: 'white'
    }
};


class CalculatorPage extends Component {
    constructor(props) {
        super(props);
        let course = this.props.course;
        if (course) {
            course.courseWork.forEach(e => e.id = this.genKey());
        }
        this.state = {
            course: course ? course : {
                name: '',
                grade: 0,
                percentage: 0.0,
                needed: 0,
                courseWork: []
            },
            perValid: true,
            nameValid: true,
            valid: true,
            editing: [],
            calculated: false,
            dirty: false,
            saved: !(course === undefined || course === null)
        };
        this.numberInputProps = {
            className: this.props.classes.input,
            step: 'any',
            min: 0,
            max: 100
        };
    }

    onPercentageChange = (e) => {
        if (isNaN(parseInt(e.target.value))) {
            this.setState({
                ...this.state,
                perValid: false,
                dirty: true
            });
            return;
        }
        if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0) {
            this.setState({
                ...this.state,
                perValid: false,
                dirty: true
            });
            return;
        }
        let course = {...this.state.course, percentage: parseInt(e.target.value)};
        this.setState({
            ...this.state,
            course,
            perValid: true,
            dirty: true
        })
    };
    onNameChange = (e) => {
        if (e.target.value === '') {
            this.setState({
                ...this.state,
                nameValid: false,
                dirty: true
            });
            return;
        }
        let course = {...this.state.course, name: e.target.value};
        this.setState({
            ...this.state,
            course,
            nameValid: true,
            dirty: true
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        let valid = this.state.course.courseWork.reduce((a, b) => a + b.percentage, 0) + this.state.course.percentage === 100;
        if (!valid) {
            this.setState({
                ...this.state,
                valid: false,
                calculated: true
            });
            return;
        }
        let course = this.state.course;
        let needed = calculator.calculateRequired(course.grade, course.percentage, 50);
        let newCourse = {...course, needed};
        this.setState({
            ...this.state,
            course: newCourse,
            valid: true,
            calculated: true,
            dirty: this.state.dirty || needed !== this.state.course.needed
        })
    };

    newCourseWorkCallback = (index) => (courseWork) => {
        let newEditing = [...this.state.editing];
        let newCourseWork = [...this.state.course.courseWork];
        courseWork.id = this.genKey();
        newCourseWork.push(courseWork);
        newEditing.splice(index, 1);
        let course = {...this.state.course};
        course.courseWork = newCourseWork;
        let total = course.courseWork.reduce((a, b) => a + b.percentage, 0);
        let grade = newCourseWork.reduce((a, b) => a + b.grade * b.percentage, 0) / total;
        if (isNaN(grade)) {
            course.grade = 0;
        } else {
            course.grade = Math.round(grade);
        }
        this.setState({
            ...this.state,
            course,
            editing: newEditing,
            dirty: true
        });
    };

    updateCourseWorkCallback = (index) => (courseWork) => {
        let newCourseWork = [...this.state.course.courseWork];
        newCourseWork[index] = courseWork;
        let course = {...this.state.course};
        course.courseWork = newCourseWork;
        let total = course.courseWork.reduce((a, b) => a + b.percentage, 0);
        let grade = newCourseWork.reduce((a, b) => a + b.grade * b.percentage, 0) / total;
        if (isNaN(grade)) {
            course.grade = 0;
        } else {
            course.grade = Math.round(grade);
        }
        this.setState({
            ...this.state,
            course,
            dirty: true
        });
    };

    deleteCallback = (index) => () => {
        let newCourseWork = [...this.state.course.courseWork];
        newCourseWork.splice(index, 1);
        let course = {...this.state.course};
        course.courseWork = newCourseWork;
        let total = course.courseWork.reduce((a, b) => a + b.percentage, 0);
        let grade = newCourseWork.reduce((a, b) => a + b.grade * b.percentage, 0) / total;
        if (isNaN(grade)) {
            course.grade = 0;
        } else {
            course.grade = Math.round(grade);
        }
        this.setState({
            ...this.state,
            course,
            dirty: true
        });
    };

    saveCourse = () => {
        if (this.state.course.name === '') {
            this.setState({
                ...this.state,
                nameValid: false
            });
            return;
        }
        if (!this.state.perValid || !this.state.nameValid) {
            return;
        }
        let needToSave = !this.state.saved;
        needToSave ? this.props.addCourse(this.state.course) : this.props.updateCourse(this.state.course);
        this.setState({
            ...this.state,
            saved: true,
            dirty: false
        });
    };

    cancelCallback = index => () => {
        let newEditing = [...this.state.editing];
        newEditing.splice(index, 1);
        this.setState({
            ...this.state,
            editing: newEditing
        });
    };

    genKey = () => new Date().valueOf() * Math.random();

    render() {
        return (
            <div style={{padding: '2vh'}}>
                <div style={{textAlign: 'right'}}>
                    {(!this.state.saved || this.state.dirty) && 'Unsaved Changes'}
                    <Button
                        color='secondary'
                        onClick={() => this.props.history.goBack()}
                        style={{backgroundColor: 'white', margin: '10px'}}>
                        Back To Main Page
                    </Button>
                </div>
                {this.state.calculated && <div style={{
                    width: '100vw',
                    position: 'absolute',
                    left: 0,
                    top: this.state.valid && this.state.course.needed === 0 ? '20vh' : '23vh'
                }}>
                    {this.state.valid && this.state.course.needed >= 0 &&
                    <h2>You need {this.state.course.needed}% on the exam to pass the course</h2>}
                    {this.state.valid && this.state.course.needed === 0 &&
                    <h2>Congrats! You've passed the course!</h2>}
                    {this.state.valid && this.state.course.needed === -1
                    && <h2>Sorry but you cannot pass this course :(</h2>}
                    {!this.state.valid && <h2>Your Exam and course work weighting must add up to 100!</h2>}
                </div>}
                <div style={{height: '25vh'}}/>
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
                            error={!this.state.nameValid}
                            disabled={this.state.saved}
                            defaultValue={this.state.course.name}
                            onChange={this.onNameChange}
                        />
                    </label>
                    <div style={{height: '25px'}}/>
                    <label style={{color: "white"}}>
                        Term grade:
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
                            disabled={true}
                            value={this.state.course.grade.toString()}
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
                            error={!this.state.perValid}
                            defaultValue={this.state.course.percentage.toString()}
                            onChange={this.onPercentageChange}
                        />
                        %
                    </label>
                    <div style={{height: '15px'}}/>
                    <Button style={{backgroundColor: 'white'}}
                            onClick={() => this.setState({
                                ...this.state, editing: [...this.state.editing, this.genKey()]
                            })}
                            color="secondary">Add Course Work</Button>
                    <Button style={{backgroundColor: 'white', marginLeft: '5px'}} type="submit"
                            color="secondary">Calculate</Button>
                    <Button style={{backgroundColor: 'white', marginLeft: '5px'}} onClick={this.saveCourse}
                            color="secondary">Save</Button>
                </form>
                {this.state.editing.length !== 0 &&
                <div style={{backgroundColor: 'white', height: '1px', marginTop: '5px'}}/>}
                {this.state.editing.map((e, index) => (
                    <GradeComponent
                        key={e}
                        editing={true}
                        course={{
                            name: '',
                            grade: 0,
                            mark: 0,
                            outOf: 0,
                            percentage: 0.0,
                        }}
                        cancelCallback={this.cancelCallback(index)}
                        callback={this.newCourseWorkCallback(index)}
                    />
                ))}
                {(this.state.editing.length !== 0 || this.state.course.courseWork.length !== 0) &&
                <div style={{backgroundColor: 'white', height: '1px', marginTop: '5px'}}/>}
                {this.state.course.courseWork.length !== 0 &&
                <h4>Course Work</h4>}
                {this.state.course.courseWork.map((e, index) => (
                    <GradeComponent
                        key={e.id}
                        index={index + 1}
                        course={{...e}}
                        editing={false}
                        cancelCallback={null}
                        deleteCallback={this.deleteCallback(index)}
                        callback={this.updateCourseWorkCallback(index)}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let courseName = state.course.map(e => e.name);
    if (ownProps.location.state && ownProps.location.state.course) {
        let course = state.course.find(e => e.name === ownProps.location.state.course.name);
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CalculatorPage)));
