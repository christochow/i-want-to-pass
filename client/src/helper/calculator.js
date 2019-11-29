let calculator = {
        calculateRequired: (termGrade, termPercentage, gradeWanted) => {
            return Math.ceil((gradeWanted-termGrade*termPercentage)/(1-termPercentage));
        },
        calculateGrade: (mark, outOf) => {
            return Math.round(mark*100/outOf)/100;
        }
    };

export default calculator
