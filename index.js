var listStudent = JSON.parse(localStorage.getItem('listStudent'));
if (listStudent == null) {
    listStudent = [];
}

function taoId() {
    var id = Math.random().toString().substr(2, 10) + '_' + String(new Date().getTime());
    return id;
}

var create = document.querySelector('.create-btn');

function studentItem(id, key, name, math, physics, chemistry) {
    if (id == null) {
        this.id = taoId();
    } else {
        this.id = id;
    }
    this.key = key;
    this.name = name;
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
    this.avg = function() {
        return (parseFloat(this.math) + parseFloat(this.physics) + parseFloat(this.chemistry)) / 3;
    }
    this.classification = function() {
        if (this.avg() >= 5) {
            return 'Đạt';
        } else {
            return 'Thi lại';
        }
    };
}



function renderStudent() {
    var listStudent_1 = JSON.parse(localStorage.getItem('listStudent'));
    if (listStudent_1 == null) {
        listStudent_1 = [];
    }
    var listStudent = [];
    for (var i = 0; i < listStudent_1.length; i++) {
        var student = new studentItem(listStudent_1[i].id, listStudent_1[i].key, listStudent_1[i].name, listStudent_1[i].math, listStudent_1[i].physics, listStudent_1[i].chemistry);
        listStudent.push(student);
    }
    var y = listStudent.map(function(student, index) {
        return `
            <ul>Sinh viên ${index+1}
                <li>Mã sinh viên: ${student.key}</li>
                <li>Tên sinh viên: ${student.name}</li>
                <li>Điểm toán: ${student.math}</li>
                <li>Điểm lý: ${student.physics}</li>
                <li>Điểm hóa: ${student.chemistry}</li>
                <li>Điểm trung bình: ${student.avg()}</li>
                <li>Xếp loại: ${student.classification()}</li>
                <button onclick = "deleteStudent('${student.id}')" class="btn-change">Xóa sinh viên</button>
                <button onclick = "updateStudent('${student.id}')" class="btn-change">Sửa sinh viên</button>
            </ul>
        `
    })
    var z = y.join(' ');
    document.querySelector('.student-list').innerHTML = z;
}

renderStudent();

var create = document.querySelector('.create-btn');
create.onclick = function() {
    var key = document.querySelector('input[name = "key"]').value;
    var name = document.querySelector('input[name = "name"]').value;
    var math = document.querySelector('input[name = "math"]').value;
    var physics = document.querySelector('input[name = "physics"]').value;
    var chemistry = document.querySelector('input[name = "chemistry"]').value;
    if (key.trim() != '' && name.trim() != '' && physics.trim() != '' && math.trim() != '' && chemistry.trim() != '') {
        var student = new studentItem(null, key, name, math, physics, chemistry);
        listStudent.push(student);
        console.log(listStudent);
        var json = JSON.stringify(listStudent);
        localStorage.setItem('listStudent', json);
        var key = document.querySelector('input[name = "key"]').value = '';
        var name = document.querySelector('input[name = "name"]').value = '';
        var math = document.querySelector('input[name = "math"]').value = '';
        var physics = document.querySelector('input[name = "physics"]').value = '';
        var chemistry = document.querySelector('input[name = "chemistry"]').value = '';
        renderStudent();
    }
}

function deleteStudent(id) {
    var listStudent = JSON.parse(localStorage.getItem('listStudent'));
    for (var i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == id) {
            listStudent.splice(i, 1);
            localStorage.setItem('listStudent', JSON.stringify(listStudent));
            renderStudent();
        }
    }
}

function updateStudent(id) {
    var listStudent_1 = JSON.parse(localStorage.getItem('listStudent'));
    if (listStudent_1 == null) {
        listStudent_1 = [];
    }
    var listStudent = [];
    for (var i = 0; i < listStudent_1.length; i++) {
        var student = new studentItem(listStudent_1[i].id, listStudent_1[i].key, listStudent_1[i].name, listStudent_1[i].math, listStudent_1[i].physics, listStudent_1[i].chemistry);
        listStudent.push(student);
    }
    create.innerHTML = 'Update Student';
    for (var i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == id) {
            var thisStudent = listStudent[i];
        }
    }
    var key = document.querySelector('input[name = "key"]');
    var name = document.querySelector('input[name = "name"]');
    var math = document.querySelector('input[name = "math"]');
    var physics = document.querySelector('input[name = "physics"]');
    var chemistry = document.querySelector('input[name = "chemistry"]');
    key.value = thisStudent.key;
    name.value = thisStudent.name;
    math.value = thisStudent.math;
    physics.value = thisStudent.physics;
    chemistry.value = thisStudent.chemistry;
    create.onclick = function() {
        var newKey = key.value;
        var newName = name.value;
        var newMath = math.value;
        var newPhysics = physics.value;
        var newChemistry = chemistry.value;
        thisStudent.key = newKey;
        thisStudent.name = newName;
        thisStudent.math = newMath;
        thisStudent.physics = newPhysics;
        thisStudent.chemistry = newChemistry;
        localStorage.setItem('listStudent', JSON.stringify(listStudent));
        renderStudent();
        key.value = '';
        name.value = '';
        math.value = '';
        physics.value = '';
        chemistry.value = '';
        create.innerHTML = 'Thêm sinh viên';
        create.onclick = function() {
            var key = document.querySelector('input[name = "key"]').value;
            var name = document.querySelector('input[name = "name"]').value;
            var math = document.querySelector('input[name = "math"]').value;
            var physics = document.querySelector('input[name = "physics"]').value;
            var chemistry = document.querySelector('input[name = "chemistry"]').value;
            var student = new studentItem(null, key, name, math, physics, chemistry);
            listStudent.push(student);
            console.log(listStudent);
            var json = JSON.stringify(listStudent);
            localStorage.setItem('listStudent', json);
            var key = document.querySelector('input[name = "key"]').value = '';
            var name = document.querySelector('input[name = "name"]').value = '';
            var math = document.querySelector('input[name = "math"]').value = '';
            var physics = document.querySelector('input[name = "physics"]').value = '';
            var chemistry = document.querySelector('input[name = "chemistry"]').value = '';
            renderStudent();
        }
    }
}