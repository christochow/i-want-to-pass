let calculator = {
        calculateRequired: (termGrade, examPercentage, gradeWanted) => {
            examPercentage = examPercentage/100;
            let needed =  Math.ceil((gradeWanted-termGrade*(1-examPercentage))/(examPercentage));
            if(needed>100.0){
                return -1;
            }
            return needed;
        },
        calculateGrade: (mark, outOf) => {
            return Math.round(mark*100/outOf);
        }
    };

export default calculator
