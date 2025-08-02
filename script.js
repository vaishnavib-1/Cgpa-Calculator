let subjects = [];
let editIndex = -1;

function addSubject() {
    const subjectInput = 
        document.getElementById('subject');
    const grade = 
        document.getElementById('grade').value;
    const creditInput = 
        document.getElementById('credit');
    const credit = 
        parseInt(creditInput.value);

   
    if (!subjectInput.value || isNaN(credit)) {
        alert('❗ Please fill out all fields.');
        return;
    }
    else if (credit < 1 || credit > 20) {
        alert('⚠️ Credit must be between 1 and 20');
        return;
    }


    if (editIndex !== -1) {
        subjects[editIndex] = 
        { subject: subjectInput.value, grade, credit };
        editIndex = -1;
    } else {
        subjects.push(
            { subject: subjectInput.value, grade, credit });
    }

    displaySubjects();
    clearForm();
}

function displaySubjects() {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';

    subjects.forEach((s, index) => {
        const row = document.createElement('tr');

        const subjectCell = document.createElement('td');
        subjectCell.textContent = s.subject;

        const gradeCell = document.createElement('td');
        gradeCell.textContent = s.grade;

        const creditCell = document.createElement('td');
        creditCell.textContent = s.credit;

        const gradePointCell = document.createElement('td');
        gradePointCell.textContent = (getGradePoint(s.grade) * s.credit).toFixed(2);

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editSubject(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSubject(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(subjectCell);
        row.appendChild(gradeCell);
        row.appendChild(creditCell);
        row.appendChild(gradePointCell);
        row.appendChild(actionCell);

        subjectList.appendChild(row);
    });
}


function calculateCGPA() {
    const currentCredits = subjects.reduce((sum, s) => sum + s.credit, 0);
    const currentGradePoints = subjects.reduce((sum, s) => sum + getGradePoint(s.grade) * s.credit, 0);

    const prevCGPA = parseFloat(document.getElementById('prevCGPA').value) || 0;
    const prevCredits = parseInt(document.getElementById('prevCredits').value) || 0;

    const totalGradePoints = (prevCGPA * prevCredits) + currentGradePoints;
    const totalCredits = prevCredits + currentCredits;

    const cgpa = totalCredits === 0 ? 0 : (totalGradePoints / totalCredits).toFixed(2);
    document.getElementById('cgpa').textContent = cgpa;
}




function editSubject(index) {
    const subjectInput = 
        document.getElementById('subject');
    const selectedSubject = subjects[index];

    subjectInput.value = selectedSubject.subject;
    document.getElementById('grade').value = 
        selectedSubject.grade;
    document.getElementById('credit').value = 
        selectedSubject.credit;

    editIndex = index;
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    displaySubjects();
}


function getGradePoint(grade) {
    switch (grade) {
        case 'AA': return 10.0;
        case 'AB': return 9.0;
        case 'BB': return 8.0;
        case 'BC': return 7.0;
        case 'CC': return 6.0;
        case 'CD': return 5.0;
        case 'DD': return 4.0;
        default: return 0.0;
    }
}

function clearForm() {
    document.getElementById('subject').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('credit').value = '';
}

function resetForm() {
    subjects = [];
    editIndex = -1;
    document.getElementById('subjectList').innerHTML = '';
    document.getElementById('cgpa').textContent = '';
    document.getElementById('prevCGPA').value = '';
    document.getElementById('prevCredits').value = '';
    clearForm();
}
