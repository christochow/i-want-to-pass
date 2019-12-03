(this["webpackJsonpi-want-to-pass"]=this["webpackJsonpi-want-to-pass"]||[]).push([[0],{105:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(7),o=a.n(s),c=(a(81),a(82),a(20)),u=a(15),i=a(33),l=a(34),p=a(36),d=a(139),h=a(29),m=a(35);var g=function(e){var t=Object(h.f)();return n.a.createElement("div",{style:{margin:"10px",textAlign:"center",paddingLeft:"6%"}},n.a.createElement(d.a,{color:"secondary",style:{backgroundColor:"white",width:"155px",marginRight:"10px"},onClick:function(){return t.push({pathname:"/course",state:{course:e.course}})}},e.course.name),n.a.createElement(d.a,{style:{marginTop:"5px"},onClick:function(){return e.callback()}},"Delete"))},b=function(e){function t(){var e,a;Object(c.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(n)))).onClick=function(){a.props.history.push("/course")},a.removeCallback=function(e){return function(){a.props.removeCourse(e)}},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{style:{padding:"2vh"}},n.a.createElement("div",{style:{height:"25vh"}}),n.a.createElement("h2",null,"I Want To Pass"),n.a.createElement("p",null,"Calculate how much you need to get on the final exam to pass a course :)"),n.a.createElement(d.a,{color:"primary",onClick:this.onClick},"Add a new course"),n.a.createElement("h3",null,"Saved courses"),this.props.course.map((function(t,a){return n.a.createElement(g,{key:a,callback:e.removeCallback(a),course:t})})),0===this.props.course.length&&"No saved course at the moment...")}}]),t}(r.Component),f=Object(h.g)(Object(m.b)((function(e){return e}),(function(e){return{removeCourse:function(t){return e({index:t,type:"removeCourse"})}}}))(b)),y=a(13),v=a(14),O=a(138),k=a(46),C=a.n(k),E={calculateRequired:function(e,t,a){t/=100;var r=Math.ceil((a-e*(1-t))/t);return r>100?-1:r},calculateGrade:function(e,t){return 0===t?0:Math.round(100*e/t)}};function j(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?j(Object(a),!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):j(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var P=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).onMarkChange=function(e){isNaN(parseInt(e.target.value))||a.setState(w({},a.state,{mark:parseInt(e.target.value)}))},a.onOutOfChange=function(e){isNaN(parseInt(e.target.value))||a.setState(w({},a.state,{outOf:parseInt(e.target.value)}))},a.onPercentageChange=function(e){e.target.value>100||e.target.value<0||isNaN(parseInt(e.target.value))||a.setState(w({},a.state,{percentage:parseInt(e.target.value)}))},a.onSubmit=function(e){e.preventDefault();var t=E.calculateGrade(a.state.mark,a.state.outOf);a.setState(w({},a.state,{grade:t,editing:!1})),a.props.callback({name:a.state.name,grade:t,mark:a.state.mark,outOf:a.state.outOf,percentage:a.state.percentage})},a.onNameChange=function(e){a.setState(w({},a.state,{name:e.target.value}))},a.state=w({},a.props.course,{editing:a.props.editing}),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{style:{margin:"15px"}},!this.state.editing&&n.a.createElement("div",null,this.props.index,". ",this.state.name,", Grade: ",this.state.grade,", worth ",this.state.percentage,"%",n.a.createElement(d.a,{onClick:function(){return e.setState(w({},e.state,{editing:!0}))}},"Edit"),n.a.createElement(d.a,{onClick:function(){return e.props.deleteCallback()}},"Delete")),this.state.editing&&n.a.createElement("form",{onSubmit:this.onSubmit},n.a.createElement("label",{style:{color:"white"}},"Name:",n.a.createElement(O.a,{style:{marginLeft:"15px"},inputProps:{className:this.props.classes.input},InputLabelProps:{className:this.props.classes.label},type:"string",required:!0,defaultValue:this.props.course.name,onChange:this.onNameChange})),n.a.createElement("label",{style:{color:"white",marginLeft:"15px"}},"Mark:",n.a.createElement(O.a,{style:{width:"50px",marginLeft:"5px"},inputProps:{className:this.props.classes.input,step:"any",min:0,max:this.state.outOf},InputLabelProps:{className:this.props.classes.label},type:"number",required:!0,defaultValue:this.props.course.mark.toString(),onChange:this.onMarkChange})),n.a.createElement("label",{style:{color:"white",marginLeft:"15px"}},"Out Of:",n.a.createElement(O.a,{style:{width:"50px",marginLeft:"5px"},inputProps:{className:this.props.classes.input,min:1,step:"any"},InputLabelProps:{className:this.props.classes.label},type:"number",required:!0,defaultValue:this.props.course.outOf.toString(),onChange:this.onOutOfChange})),n.a.createElement("label",{style:{color:"white",marginLeft:"15px"}},"Worth:",n.a.createElement(O.a,{style:{width:"50px",marginLeft:"5px"},inputProps:{className:this.props.classes.input,step:"any",min:1,max:100},InputLabelProps:{className:this.props.classes.label},type:"number",required:!0,defaultValue:this.props.course.percentage.toString(),onChange:this.onPercentageChange}),"%"),n.a.createElement(d.a,{style:{backgroundColor:"white",marginLeft:"5px"},type:"submit",color:"secondary"},"Save"),n.a.createElement(d.a,{style:{backgroundColor:"white",marginLeft:"5px"},onClick:function(){return e.props.cancelCallback?e.props.cancelCallback():e.setState(w({},e.props.course,{editing:!1}))},color:"secondary"},"Cancel")))}}]),t}(r.Component),x=C()({input:{color:"white"},label:{color:"white"}})(P);function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(Object(a),!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var W=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).onPercentageChange=function(e){if(!(e.target.value>100||e.target.value<0)&&!isNaN(parseInt(e.target.value))){var t=N({},a.state.course,{percentage:parseInt(e.target.value)});a.setState(N({},a.state,{course:t,dirty:!0}))}},a.onNameChange=function(e){var t=N({},a.state.course,{name:e.target.value});a.setState(N({},a.state,{course:t,dirty:!0}))},a.onSubmit=function(){if(a.state.course.courseWork.reduce((function(e,t){return e+t.percentage}),0)+a.state.course.percentage===100){var e=a.state.course,t=N({},e,{needed:E.calculateRequired(e.grade,e.percentage,50)});a.setState(N({},a.state,{course:t,saved:!0,valid:!0,calculated:!0,dirty:!0}))}else a.setState(N({},a.state,{valid:!1,calculated:!0}))},a.newCourseWorkCallback=function(e){return function(t){var r=Object(y.a)(a.state.editing),n=Object(y.a)(a.state.course.courseWork);n.push(t),r.splice(e,1);var s=N({},a.state.course);s.courseWork=n;var o=s.courseWork.reduce((function(e,t){return e+t.percentage}),0),c=n.reduce((function(e,t){return e+t.grade*t.percentage}),0)/o;isNaN(c)||(s.grade=Math.round(c)),a.setState(N({},a.state,{course:s,editing:r,dirty:!0}))}},a.updateCourseWorkCallback=function(e){return function(t){var r=Object(y.a)(a.state.course.courseWork);r[e]=t;var n=N({},a.state.course);n.courseWork=r;var s=n.courseWork.reduce((function(e,t){return e+t.percentage}),0),o=r.reduce((function(e,t){return e+t.grade*t.percentage}),0)/s;isNaN(o)||(n.grade=Math.round(o)),a.setState(N({},a.state,{course:n,dirty:!0}))}},a.deleteCallback=function(e){return function(){var t=Object(y.a)(a.state.course.courseWork);t.splice(e,1);var r=N({},a.state.course);r.courseWork=t,a.setState(N({},a.state,{course:r,dirty:!0}))}},a.saveCourse=function(e){e.preventDefault(),!a.state.saved?a.props.addCourse(a.state.course):a.props.updateCourse(a.state.course),a.setState(N({},a.state,{saved:!0,dirty:!1}))},a.cancelCallback=function(e){return function(){var t=Object(y.a)(a.state.editing);t.splice(e,1),a.setState(N({},a.state,{editing:t}))}},a.state={course:a.props.course?a.props.course:{name:"",grade:0,percentage:0,needed:0,courseWork:[]},valid:!0,editing:[],calculated:!1,dirty:!1,saved:!(void 0===a.props.course)},a.numberInputProps={className:a.props.classes.input,step:"any",min:0,max:100},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{style:{padding:"2vh"}},n.a.createElement("div",{style:{textAlign:"right"}},(!this.state.saved||this.state.dirty)&&"Unsaved Changes",n.a.createElement(d.a,{color:"secondary",onClick:function(){return e.props.history.goBack()},style:{backgroundColor:"white",margin:"10px"}},"Back To Main Page")),n.a.createElement("div",{style:{height:"25vh"}}),this.state.calculated&&this.state.valid&&this.state.course.needed>=0&&n.a.createElement("h2",null,"You need ",this.state.course.needed,"% on the exam to pass the course"),this.state.calculated&&this.state.valid&&this.state.course.needed<0&&n.a.createElement("h2",null,"Sorry but you cannot pass this course :("),!this.state.valid&&n.a.createElement("h2",null,"Your Exam and course work weighting must add up to 100!"),n.a.createElement("form",{onSubmit:this.saveCourse},n.a.createElement("label",{style:{color:"white"}},"Course Name:",n.a.createElement(O.a,{style:{marginLeft:"15px"},inputProps:{className:this.props.classes.input},InputLabelProps:{className:this.props.classes.label},type:"string",required:!0,disabled:this.state.saved,defaultValue:this.state.course.name,onChange:this.onNameChange})),n.a.createElement("div",{style:{height:"25px"}}),n.a.createElement("label",{style:{color:"white"}},"Term grade:",n.a.createElement(O.a,{style:{marginLeft:"15px"},inputProps:this.numberInputProps,InputLabelProps:{className:this.props.classes.label},type:"number",required:!0,disabled:!0,value:this.state.course.grade.toString(),onChange:this.onGradeChange})),n.a.createElement("div",{style:{height:"25px"}}),n.a.createElement("label",{style:{color:"white"}},"Enter your exam weighting:",n.a.createElement(O.a,{style:{marginLeft:"15px"},inputProps:this.numberInputProps,InputLabelProps:{className:this.props.classes.label},type:"number",defaultValue:this.state.course.percentage.toString(),onChange:this.onPercentageChange}),"%"),n.a.createElement("div",{style:{height:"15px"}}),n.a.createElement(d.a,{style:{backgroundColor:"white"},onClick:function(){return e.setState(N({},e.state,{editing:[].concat(Object(y.a)(e.state.editing),[{}])}))},color:"secondary"},"Add Course Work"),n.a.createElement(d.a,{style:{backgroundColor:"white",marginLeft:"5px"},onClick:this.onSubmit,color:"secondary"},"Calculate"),n.a.createElement(d.a,{style:{backgroundColor:"white",marginLeft:"5px"},type:"submit",color:"secondary"},"Save")),0!==this.state.editing.length&&n.a.createElement("div",{style:{backgroundColor:"white",height:"1px",marginTop:"5px"}}),this.state.editing.map((function(t,a){return n.a.createElement(x,{key:a,editing:!0,course:{name:"",grade:0,mark:0,outOf:0,percentage:0},cancelCallback:e.cancelCallback(a),callback:e.newCourseWorkCallback(a)})})),(0!==this.state.editing.length||0!==this.state.course.courseWork.length)&&n.a.createElement("div",{style:{backgroundColor:"white",height:"1px",marginTop:"5px"}}),0!==this.state.course.courseWork.length&&n.a.createElement("h4",null,"Course Work"),this.state.course.courseWork.map((function(t,a){return n.a.createElement(x,{key:a+1,index:a+1,course:N({},t),editing:!1,cancelCallback:null,deleteCallback:e.deleteCallback(a),callback:e.updateCourseWorkCallback(a)})})))}}]),t}(r.Component),L=C()({input:{color:"white"},label:{color:"white"}})(Object(h.g)(Object(m.b)((function(e,t){var a=e.course.map((function(e){return e.name}));return t.location.state&&t.location.state.course?{courseName:a,course:e.course.find((function(e){return e.name===t.location.state.course.name}))}:{courseName:a}}),(function(e){return{addCourse:function(t){return e({course:{name:t.name,grade:t.grade,percentage:t.percentage,needed:t.needed,courseWork:t.courseWork},type:"addCourse"})},updateCourse:function(t){return e({course:{name:t.name,grade:t.grade,percentage:t.percentage,needed:t.needed,courseWork:t.courseWork},type:"updateCourse"})}}}))(W)));var I=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(h.c,null,n.a.createElement(h.a,{path:"/course"},n.a.createElement(L,null)),n.a.createElement(h.a,{path:"/"},n.a.createElement(f,null))))},D=a(42);function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(Object(a),!0).forEach((function(t){Object(v.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var A=new(a(67).a),T={course:A.get("course")?A.get("course"):[]},V=Object(D.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"addCourse":var a=Object(y.a)(e.course);a.push(t.course);var r=M({},e,{course:a});return A.set("course",JSON.stringify(r.course)),r;case"updateCourse":var n=Object(y.a)(e.course),s=n.findIndex((function(e){return e.name===t.course.name}));n[s]=t.course;var o=M({},e,{course:n});return A.set("course",JSON.stringify(o.course)),o;case"removeCourse":var c=Object(y.a)(e.course);c.splice(t.index,1);var u=M({},e,{course:c});return A.set("course",JSON.stringify(u.course)),u;default:return e}}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=a(51),B=a.n(J),G=a(137),R=a(48),Y=a(32),U=B()({palette:{primary:{main:R.a[50]},secondary:{main:R.a[900]}},status:{danger:"red"}});o.a.render(n.a.createElement(G.a,{theme:U},n.a.createElement(Y.a,null,n.a.createElement(m.a,{store:V},n.a.createElement(I,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},76:function(e,t,a){e.exports=a(105)},81:function(e,t,a){},82:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.23a60763.chunk.js.map