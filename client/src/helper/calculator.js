let calculator = {
    calculateRequired: (termGrade, examPercentage, gradeWanted) => {
        examPercentage = examPercentage / 100;
        let div = examPercentage;
        if(div === 0){
            div = 1;
        }
        let needed = Math.ceil((gradeWanted - termGrade * (1 - examPercentage)) / (div));
        if (needed > 100.0) {
            return -1;
        } else if (needed < 0.0) {
            return 0;
        }
        return needed;
    },
    calculateGrade: (mark, outOf) => {
        if (outOf === 0) {
            return 0;
        }
        return Math.round(mark * 100 / outOf);
    }
};

export default calculator
