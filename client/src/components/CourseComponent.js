import React from 'react';
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";

function CourseComponent(props) {
    let history = useHistory();

    return (
        <div style={{margin: '10px', textAlign:'center', paddingLeft: '6%'}}>
            <Button
                color='secondary'
                style={{backgroundColor: 'white', width:'155px', marginRight: '10px'}}
                onClick={() => history.push({
                    pathname: '/course',
                    state: {course: props.course}
                })}>{props.course.name}</Button>
            <Button style={{marginTop: '5px'}} onClick={()=>props.callback()}>Delete</Button>
        </div>
    );
}

export default CourseComponent;
