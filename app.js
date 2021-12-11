var jitt;
var recitation;
var hw;
const exams = [];

var second;
var jittField;

var third;
var recitationField;

var fourth;
var hwField;

var fifth;
var exam1;

var sixth;
var exam2;

var seventh;
var exam3;

var final;

var isTolman = false;

var start;

function loadFunction() {
    start = document.getElementById("start");
    start.style.opacity = "1";
}

function StartHernandez() {
    start.style.opacity = "0";

    setTimeout(function () {
        start.remove();

        second = document.getElementById("second");
        jittField = document.getElementById("jitt");

        second.style.opacity = "1";

        jittField.focus();

        jittField.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitJITT();
            }
        });
    }, 500);
}

function StartTolman() {
    isTolman = true;

    var start = document.getElementById("start");
    start.style.opacity = "0";

    setTimeout(function () {
        start.remove();
        
        second = document.getElementById("second");
        second.remove();

        third = document.getElementById("third");
        recitationField = document.getElementById("recitation");

        third.style.opacity = "1";

        recitationField.focus();

        recitationField.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitRecitation();
            }
        });

    }, 500);
}

function SubmitJITT() {
    second.style.opacity = "0";
    jitt = parseFloat(jittField.value)/(0.9*1020.0);

    if(jitt > 1.0) {
        jitt = 1.0;
    }

    setTimeout(function() {
        second.remove();

        third = document.getElementById("third");
        recitationField = document.getElementById("recitation");

        third.style.opacity = "1";

        recitationField.focus();

        recitationField.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitRecitation();
            }
        });
    }, 500);
}

function SubmitRecitation() {
    third.style.opacity = "0";
    recitation = parseFloat(recitationField.value)/10.0;

    if(recitation > 1.0) {
        recitation = 1.0;
    }

    setTimeout(function() {
        third.remove();

        fourth = document.getElementById("fourth");
        hwField = document.getElementById("hw");

        fourth.style.opacity = "1";

        hwField.focus();

        hwField.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitHW();
            }
        });
    }, 500);
}

function SubmitHW() {
    fourth.style.opacity = "0";
    hw = parseFloat(hwField.value)/90.0;

    if(hw > 1.0) {
        hw = 1.0;
    }

    setTimeout(function() {
        fourth.remove();

        fifth = document.getElementById("fifth");
        exam1 = document.getElementById("exam1");

        fifth.style.opacity = "1";

        exam1.focus();

        exam1.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitExam1();
            }
        });
    }, 500);
}

function SubmitExam1() {
    fifth.style.opacity = "0";
    exams.push(parseFloat(exam1.value)/100.0);

    setTimeout(function() {
        fifth.remove();

        sixth = document.getElementById("sixth");
        exam2 = document.getElementById("exam2");

        sixth.style.opacity = "1";

        exam2.focus();

        exam2.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitExam2();
            }
        });
    }, 500);
}

function SubmitExam2() {
    sixth.style.opacity = "0";
    exams.push(parseFloat(exam2.value)/100.0);

    setTimeout(function() {
        sixth.remove();

        seventh = document.getElementById("seventh");
        exam3 = document.getElementById("exam3");

        seventh.style.opacity = "1";

        exam3.focus();

        exam3.addEventListener("keyup", function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
                SubmitExam3();
            }
        });
    }, 500);
}


function SubmitExam3() {
    seventh.style.opacity = "0";
    exams.push(parseFloat(exam3.value)/100.0);

    var min = exams[0];

    for(i = 0; i < 3; i++) {
        if (exams[i] < min) {
            min = exams[i];
        }
    }

    var subtotal;

    if(isTolman) {
        subtotal = (5.0*recitation) + (25.0*hw) + (15.0*exams[0]) +
            (15.0*exams[1]) + (15.0*exams[2]) - (7.5*min);
    } else {
        subtotal = (5.0*jitt) + (5.0*recitation) + (25.0*hw) + (15.0*exams[0]) +
            (15.0*exams[1]) + (15.0*exams[2]) - (7.5*min);
    }
    

    var table = document.getElementById("table");

    var cutoffs = [92, 88, 84, 80, 76, 72, 68, 64, 60, 0];

    var minHit = false;
    var reduced = false;


    for(i = 0; i < 10; i++) {
        var minScore;
        if(isTolman) {
            minScore = (cutoffs[i] - subtotal)/0.325;
        } else {
            minScore = (cutoffs[i] - subtotal)/0.275;
        }
        if(minScore < 0 && !minHit) {
            minScore = "0%";
            minHit = true;
        } else if(minScore > 100 || minHit) {
            minScore = "---";
        } else if(minScore/100.0 < min) {
            if(!reduced) {
                subtotal += 7.5*min;
                reduced = true;
            }

            if(isTolman) {
                minScore = (cutoffs[i]-subtotal)/0.25;
            } else {
                minScore = (cutoffs[i] - subtotal)/0.2;
            }
            minScore = String(Math.ceil(minScore * 10)/10) + "%";
            
            if(minScore < 0 && !minHit) {
                minScore = "0%";
                minHit = true;
            } else if(minScore > 100 || minHit) {
                minScore = "---";
            }
        } else {
            minScore = String(Math.ceil(minScore * 10)/10) + "%";
        }

        table.rows[i].cells[2].innerHTML = minScore;
    }

    setTimeout(function() {
        seventh.remove();

        document.getElementById("final").style.opacity = "1";
    }, 500);
}
