import {createStore} from 'redux'
import {Cookies} from 'react-cookie'

const cookies = new Cookies();

const initialState = {
    course: cookies.get('course') ? cookies.get('course') : []
};


let reducers = function (state = initialState, action) {
    switch (action.type) {
        case 'addCourse':
            let newCourses = [...state.course];
            newCourses.push(action.course);
            let newState1 = {
                ...state,
                course: newCourses
            };
            cookies.set('course', JSON.stringify(newState1.course));
            return newState1;
        case 'updateCourse':
            let courses = [...state.course];
            let ind = courses.findIndex(e => e.name === action.course.name);
            courses[ind] = action.course;
            let newState2 = {
                ...state,
                course: courses
            };
            cookies.set('course', JSON.stringify(newState2.course));
            return newState2;
        default:
            return state;
    }
};

export default createStore(reducers);
