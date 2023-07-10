import eel  
import sqlite3 as sql


eel.init("userinterface")

databasename = 'ssis.db'


#This will read the file in the Student CSV
@eel.expose
def getAllStudent():
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    for row in cur.execute("SELECT * FROM Students"):
        students.append(row)

    con.commit()
    con.close()

    return students

#This will Append Students into the Student CSV
@eel.expose
def AddStudent(studentInfo):
    try:
        con = sql.connect(databasename)
        cur = con.cursor()
        query = '''INSERT INTO Students (fname, mname, lname, gender, dob, gmail, year_level, course_code)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                '''
        cur.execute(
            query,
            (
                studentInfo[0],
                studentInfo[1],
                studentInfo[2],
                studentInfo[3],
                studentInfo[4],
                studentInfo[5],
                studentInfo[6],
                studentInfo[7],
            ),
        )
        con.commit()
        con.close()
        return True
    except Exception as e:
        return False


@eel.expose
#Search for Student Using LRN
def SearchById(id):
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    query = "SELECT * FROM Students WHERE student_id LIKE ?;"
    pattern = f"{id}%"
    for row in cur.execute(query, (pattern,)):
        students.append(row)

    con.commit()
    con.close()

    return students


@eel.expose
#Search for Student Using Name
def SearchByName(name):
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    query = "SELECT * FROM Students WHERE fname LIKE ?;"
    pattern = f"{name}%"
    for row in cur.execute(query, (pattern,)):
        students.append(row)

    con.commit()
    con.close()

    return students



@eel.expose
def UpdateStudent(id, new_data):
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "UPDATE Students SET fname = ?, mname = ?, lname = ?, gender = ?, dob = ?, gmail = ?, year_level = ?, course_code = ? WHERE student_id = ?;"
    try:
        cur.execute(
            query,
            (
                new_data[0],
                new_data[1],
                new_data[2],
                new_data[3],
                new_data[4],
                new_data[5],
                new_data[6],
                new_data[7],
                id,
            ),
        )
        con.commit()
        con.close()
        return True
    except Exception as e:
        con.rollback()
        con.close()
        return False



@eel.expose
def DeleteStudent(studentid):
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "DELETE FROM Students WHERE student_id = ?;"
    try:
        cur.execute(query, (studentid,))
        con.commit()
        con.close()
        return True
    except Exception as e:
        print(f"Error occurred while deleting student record: {str(e)}")
        con.rollback()
        con.close()
        return False

@eel.expose
#Search for Student Using Name
def CourseSearchStudent(code):
    con = sql.connect(databasename)
    cur = con.cursor()
    students = []
    query = "SELECT * FROM Students WHERE course_code = ?;"
    for row in cur.execute(query, (code,)):
        students.append(row)

    con.commit()
    con.close()

    return students

#This will get All the Courses
@eel.expose
def getAllSCourses():
    con = sql.connect(databasename)
    cur = con.cursor()
    courses = []
    for row in cur.execute("SELECT * FROM Courses"):
        courses.append(row)

    con.commit()
    con.close()

    return courses


@eel.expose
#Search for Student Using LRN
def GetSpecificCourse(course_code):
    con = sql.connect(databasename)
    cur = con.cursor()
    query = "SELECT * FROM Courses WHERE course_code = ?;"
    cur.execute(query, (course_code,))
    course = cur.fetchone()
    con.close()
    return course


@eel.expose
#Search for Courses Using id
def UpdateCourse(code, course):
    try:
        con = sql.connect(databasename) # Replace "databasename.db" with your actual SQLite database file
        cur = con.cursor()
        query = "UPDATE Courses SET course = ? WHERE course_code = ?;"
        cur.execute(query, (course, code))
        con.commit()
        con.close()
        return True
    except sql.Error as error:
        print("Error updating course in the database:", error)
        return False

#This will delete the Course using id
@eel.expose
def DeleteCourse(id):
    try:
        con = sql.connect(databasename)  # Replace "databasename.db" with your actual SQLite database file
        cur = con.cursor()
        query = "DELETE FROM Courses WHERE course_code = ?;"
        cur.execute(query, (id,))
        con.commit()
        con.close()
        return True
    except sql.Error as error:
        print("Error deleting course from the database:", error)
        return False



@eel.expose
#Search for Student Using LRN
def SearchByCode(code):
    try:
        connection = sql.connect(databasename)
        cursor = connection.cursor()
        query = "SELECT * FROM Courses WHERE course_code LIKE ?;"
        code_pattern = '%' + code + '%' 
        cursor.execute(query, (code_pattern,))
        courses = cursor.fetchall()
        connection.close()
        return courses
    except sql.Error as error:
        print("Error searching for courses by code:", error)


@eel.expose
def IsUniqueId(id):
    try:
        con = sql.connect(databasename)  # Replace "databasename.db" with your actual SQLite database file
        cur = con.cursor()
        query = "SELECT COUNT(*) FROM Courses WHERE course_code = ?;"
        cur.execute(query, (id,))
        count = cur.fetchone()[0]
        con.close()
        return count == 0
    except sql.Error as error:
        return False


#This will Append Course into the Courses CSV
@eel.expose
def AddCourses(coursesInfo):
    try:
        con = sql.connect(databasename)  # Replace "databasename.db" with your actual SQLite database file
        cur = con.cursor()
        query = "INSERT INTO Courses (course_code, course) VALUES (?, ?);"
        cur.execute(query, (coursesInfo))
        con.commit()
        con.close()
        return True
    except sql.Error as error:
        return False

eel.start("student.html")

