import React from 'react';
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";

function CourseComponent(props) {
    let history = useHistory();

    return (
        <div style={{margin: '10px'}}>
            <Button
                color='secondary'
                style={{backgroundColor: 'white'}}
                onClick={() => history.push({
                    pathname: '/course',
                    state: {course: props.course}
                })}>{props.course.name}</Button>
        </div>
    );
}

export default CourseComponent;
