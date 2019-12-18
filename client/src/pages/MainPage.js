import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import CourseComponent from "../components/CourseComponent";
import CookieBanner from 'react-cookie-banner';
import {isMobile} from "react-device-detect";

class MainPage extends Component {

    onClick = () => {
        this.props.history.push('/course')
    };

    removeCallback = (index) => () => {
        this.props.removeCourse(index)
    };

    cookieLink = (
        <div style={{
            verticalAlign: 'middle',
            fontWeight: 400,
            width: '100%',
            lineHeight: '100px',
            height:'100px'
        }}>
           This website uses cookies to store your entered data. By using IWantToPass, you agree to our <a
            style={{textDecoration: 'underline'}} onClick={()=>this.props.history.push('/cookie')}>use of cookies</a>
        </div>
    );

    render() {
        return (
            <div style={{padding: '2vh'}}>
                <div style={{height: '25vh'}}/>
                <h2>I Want To Pass</h2>
                <p>Calculate how much you need to get on the final exam to pass a course :)</p>
                <Button color="primary" onClick={this.onClick}>Add a new course</Button>
                <h3>Saved courses</h3>
                {this.props.course.map((e, ind) => (
                    <CourseComponent key={ind} callback={this.removeCallback(ind)} course={e}/>))}
                {this.props.course.length === 0 && 'No saved course at the moment...'}
                {!isMobile && <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
                    <CookieBanner
                                  link={this.cookieLink}
                                  styles={{
                                      banner: { backgroundColor: 'rgba(60, 60, 60, 0.8)', height:'100px'},
                                  }}
                                  dismissOnScroll={false}/>
                </div>}
            </div>
        )
    };
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        removeCourse: (data) => dispatch({index: data, type: 'removeCourse'})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
