import React, { Component } from 'react';
import './App.css';
import Course from './components/course';
import NavBar from './components/navbar';
import Footer from './components/footer';

class App extends Component {
  state = {
    courses: [
      {
        id:0,
        courseName: 'Who',
        grades: [
          {id: 0,
          name: "Assignment 1",
          result: 30,
          weight: 20},
          {id: 1,
          name: "Assignment 1",
          result: 30,
          weight: 20},
          {id: 2,
          name: "Assignment 1",
          result: 30,
          weight: 20}
        ],
        desGrade: 50
      }
    ]
  }

  save = () => {
    localStorage.setItem('data', JSON.stringify(this.state.courses))
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.save()
  //   }, 1000)

  //   // if (localStorage.getItem('data')) {
  //   //   const courses = JSON.parse(localStorage.getItem('data'));
  //   //   this.setState({courses})
  //   // }
  // }

  addCourse = () => {
    const courses = [...this.state.courses]
    courses.push({
      id: courses.length,
      courseName: '',
      grades: [
        {id: 0,
        name: '',
        result: '',
        weight:''},
        {id: 2,
        name: '',
        result: '',
        weight:''},
        {id: 3,
        name: '',
        result: '',
        weight:''},
      ],
      desGrade: 50
    })
    this.setState({courses})
  }

  deleteCourse = (id) => {
    const courses = this.state.courses.filter(course => course.id !== id);
    for (let i = id; i <= courses.length-1; i++) {
      courses[i].id = courses[i].id - 1;
    }
    this.setState({courses})
  }

  addGrade = (courseId) => {
    const courses = [...this.state.courses]
    courses[courseId].grades.push(
      {id: courses[courseId].grades.length,
      name: '',
      result: null,
      weight: null})
    this.setState({courses})
  }
  
  deleteGrade = (courseId, gradeId) => {
    const courses = [...this.state.courses]
    const grades = this.state.courses[courseId].grades.filter(grade => grade.id !== gradeId);
    for (let i = gradeId; i <= grades.length-1; i++) {
      grades[i].id = grades[i].id - 1;
    }
    courses[courseId].grades = grades
    this.setState({courses})
  }

  handleGrade = (event, courseId, gradeId) => {
    var tmp = event.target.value;
    var eventId = event.target.id;
    const courses = [...this.state.courses]
    switch (eventId) {
      case "name"+courseId+gradeId:
        courses[courseId].grades[gradeId].name = tmp; break;
      case "result"+courseId+gradeId:
        courses[courseId].grades[gradeId].result = tmp; break;
      case "weight"+courseId+gradeId:
        courses[courseId].grades[gradeId].weight = tmp; break;
      default:
        break;
    }
    this.setState({courses})
  }

  handleDesiredGrade = (event, courseId) => {
    var tmp = event.target.value;
    const courses = [...this.state.courses]
    courses[courseId].desGrade = tmp;
    this.setState({courses})
  }

  handelCourseName = (event, courseId) => {
    var tmp = event.target.value;
    const courses = [...this.state.courses]
    courses[courseId].courseName = tmp;
    this.setState({courses})
  }

  totalWeight = (courseId) => {
    const grades = this.state.courses[courseId].grades
    var total = 0;
    for (var i in grades)
      total += grades[i].weight*1;//fixes future adddition bug
    return total;
  }

  curGrade = (courseId) => {
    const grades = this.state.courses[courseId].grades
    var total = 0;
    for (var i in grades)
      total += grades[i].weight * (grades[i].result/100);
    return total;
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
        <button onClick={() => this.addCourse("test")} className="btn btn-small btn-primary">Add Class</button>
        {this.state.courses.map(course => 
          <Course
            key={course.id}
            id={course.id}
            courseName={course.courseName}
            grades={course.grades}
            desGrade={course.desGrade}
            deleteCourse={this.deleteCourse}
            addGrade={this.addGrade}
            deleteGrade={this.deleteGrade}
            handleGrade={this.handleGrade}
            totalWeight={this.totalWeight}
            curGrade={this.curGrade}
            handleDesiredGrade={this.handleDesiredGrade}
            handelCourseName={this.handelCourseName}/>
        )}
        <Footer/>   
      </div>
    );
  }
}

export default App;
