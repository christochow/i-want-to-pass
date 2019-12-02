import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import CourseComponent from "../components/CourseComponent";

class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    onClick = () => {
        this.props.history.push('/i-want-to-pass/course')
    };

    render() {
        return (
            <div style={{padding:'2vh'}}>
                <div style={{height: '25vh'}}/>
                <h2>I Want To Pass</h2>
                <Button color="primary" onClick={this.onClick}>Add a new course</Button>
                <h3>Saved courses</h3>
                {this.props.course.map((e,ind) => (<CourseComponent key={ind} course={e}/>))}
            </div>
        )
    };
}

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps)(MainPage));
