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
        courseName: '',
        grades: [
          {id: 0,
          name: '',
          result: '',
          weight: ''},
          {id: 1,
          name: '',
          result: '',
          weight: ''},
          {id: 2,
          name: '',
          result: '',
          weight: ''}
        ],
        desGrade: 50
      }
    ]
  }

  save = () => {
    sessionStorage.setItem('data', JSON.stringify(this.state.courses))
  }

  componentDidMount() {
    setInterval(() => {
      this.save()
    }, 1000)

    if (sessionStorage.getItem('data')) {
      const courses = JSON.parse(sessionStorage.getItem('data'));
      this.setState({courses})
    }
  }

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

  handle = (event, courseId, gradeId) => {
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
      case "desGrade"+courseId:
        courses[courseId].desGrade = tmp; break;
      case courses[courseId].courseName+courseId:
        courses[courseId].courseName = tmp; break;
      default:
        break;
    }
    this.setState({courses})
  }

  calculation = (courseId) => {
    const grades = this.state.courses[courseId].grades
    var totalWeight = 0;
    var totalGrade = 0;
    for (var i in grades) {
      totalWeight += grades[i].weight*1;//fixes future adddition bug
      totalGrade += grades[i].weight * (grades[i].result/100);
    }
    return [totalWeight, totalGrade];
  }

  download = () => {
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", JSON.stringify(this.state.courses)]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "grades.json";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  upload = (e) => {
    let json = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(json[0]);

  
  }



  render() {
    return (
      <div className="App">
        <NavBar/>
        <button onClick={() => this.addCourse("test")} className="btn btn-sm btn-primary">Add Class</button>
        <button onClick={() => this.download()} className="btn btn-sm btn-info">Download json</button>
        <input className="bg-warning" type="file" id="upload" onChange={(e) => this.upload(e)} />
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
            handle={this.handle}
            calculation={this.calculation}/>
        )}
        <Footer/>   
      </div>
    );
  }
}

export default App;
