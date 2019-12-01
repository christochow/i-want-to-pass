import {createStore} from 'redux'

const initialState = {
    course: []
};

let reducers = function (state = initialState, action) {
    switch (action.type) {
        case 'addCourse':
            let newCourses = [...state.course];
            newCourses.push(action.course);
            return {
                ...state,
                course: newCourses
            };
        case 'updateCourse':
            let courses = [...state.course];
            let ind = courses.findIndex(e=>e.name===action.course.name);
            courses[ind] = action.course;
            return {
                ...state,
                course: courses
            };
        default:
            return state;
    }
};

export default createStore(reducers);
