# importing the eel library
import eel
import sqlite3 as sql

# initializing the application
eel.init("gui")

databasename = 'StudentsInfo.db'



@eel.expose
def getAllStudents():
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    for row in cur.execute("SELECT * FROM student"):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
def add(studentinfo):
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "INSERT INTO student (lrn, fname, mname, lname, gender, gmail, year, course, coursecode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ;"
    cur.execute(
        query,
        (
            studentinfo[0],
            studentinfo[1],
            studentinfo[2],
            studentinfo[3],
            studentinfo[4],
            studentinfo[5],
            studentinfo[7],
            studentinfo[6],
            studentinfo[8],
        ),
    )
    con.commit()
    for row in cur.execute("SELECT * FROM student"):
        print(row)

    con.close()


@eel.expose
def searchStudentbyLrn(id):
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    query = "SELECT * FROM student WHERE lrn LIKE ?;"
    pattern = f"{id}%"
    for row in cur.execute(query, (pattern,)):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
def searchStudentbyName(name):
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    query = "SELECT * FROM Student WHERE fname LIKE ?;"
    pattern = f"{name}%"
    for row in cur.execute(query, (pattern,)):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
def updateStudent(studentid, studentinfo):
    print(studentinfo)
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "UPDATE Student SET fname = ?, mname = ?, lname = ?, gender = ?, gmail=?,course = ?, year = ?, coursecode = ? WHERE lrn = ?;"
    cur.execute(
        query,
        (
            studentinfo[0],
            studentinfo[1],
            studentinfo[2],
            studentinfo[3],
            studentinfo[4],
            studentinfo[5],
            studentinfo[6],
            studentinfo[7],
            studentid,
        ),
    )
    con.commit()
    con.close()


@eel.expose
def getStudentInfo(studentid):
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "SELECT * FROM student WHERE lrn = ?;"
    cur.execute(
        query,
        (studentid,),
    )
    student_info = cur.fetchone()
    return student_info


@eel.expose
def deleteStudent(studentid):
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "DELETE from student where lrn =?"
    cur.execute(
        query,
        (studentid,),
    )
    con.commit()
    con.close()


eel.start("index.html")
