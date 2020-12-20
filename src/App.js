import React, { Component } from 'react';
import './App.css';
import Course from './components/course';
import NavBar from './components/navbar';
import Footer from './components/footer';

class App extends Component {
  state = {
    division: [5,10],
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
        {id: 1,
        name: '',
        result: '',
        weight:''},
        {id: 2,
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
    const division = [...this.state.division]
    const re = /^[0-9\b]|\.+$/;
    const re2 = /^[0-9\b]+$/;
    switch (eventId) {
      case "name"+courseId+gradeId:
        courses[courseId].grades[gradeId].name = tmp; break;
      case "result"+courseId+gradeId:
        if (event.target.value === '' || re.test(event.target.value)) {
          courses[courseId].grades[gradeId].result = tmp;
        } break;
      case "weight"+courseId+gradeId:
        if (event.target.value === '' || re.test(event.target.value)) {
          courses[courseId].grades[gradeId].weight = tmp;
        } break;
      case "desGrade"+courseId:
        if (event.target.value === '' || re.test(event.target.value)) {
          courses[courseId].desGrade = tmp;
        } break;
      case courses[courseId].courseName+courseId:
        courses[courseId].courseName = tmp; break;
      case "numerator":
        if (event.target.value === '' || re2.test(event.target.value)) {
          division[0] = tmp;
        } break;
      case "denominator":
        if (event.target.value === '' || re2.test(event.target.value)) {
          division[1] = tmp;
        } break;
      default:
        break;
    }
    this.setState({courses})
    this.setState({division})
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
    var json = e.target.files;
    console.log("Data file", json)

    let reader = new FileReader();
    reader.readAsText(json[0]);
    reader.onload= (e) => {
      console.log(e.target.result)
      const courses = JSON.parse(e.target.result);
      this.setState({courses})
    }
  }


  isNumber = (e) => {
    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  } 

  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
  }

  render() {
    return (
      <div className="App">
        <NavBar/>

        <div id="mySidenav" className="sidenav bg-info text-center">
            <h4 className="text-light font-weight-bold">Helper</h4><hr/>
            <p className="text-light px-3">For grades formatted as fractions:</p>
            <div  className="input-group bg-info w-50 ml-4">
                <input type="text" id="numerator" value={this.state.division[0]} onChange={e => this.handle(e, 0, 0)} className="form-control ml-5" aria-describedby="basic-addon1" />
            </div>

            <h1 className="text-center mx-auto">/</h1> 

            <div className="input-group bg-info w-50 ml-5">
                <input type="text" id="denominator" value={this.state.division[1]} onChange={e => this.handle(e, 0, 0)} className="form-control ml-5" aria-describedby="basic-addon1" />
            </div>
            <br/>
            <div className="input-group">
                <input type="text" id={"eq"} ref={(textarea) => this.textArea = textarea}
                className="form-control w-25 ml-3" value={this.state.division[0]/this.state.division[1] * 100} size="2" placeholder="Your Grade" aria-label="Your Grade" aria-describedby="basic-addon1" readOnly/>
                <div className="input-group-append mr-3">
                    <span className="input-group-text">%</span>
                </div>
            </div>

            <button className="btn btn-sm btn-secondary mt-3" onClick={() => this.copyCodeToClipboard()}>Copy to Clipboard</button> <br/> <hr/>

            <button className="closebtn title-font btn btn-nonhover rounded-circle" onClick={() => document.getElementById("mySidenav").style.width = "0"} >&times;</button>
            
            <div>
                <p className="text-light px-3">Download a JSON format <br/>  of your grades</p>
                <button onClick={() => this.download()} className="btn btn-sm btn-secondary">Download json</button> <br/> <hr/>
                <p className="text-light px-3">Upload a JSON format <br/>  of your grades</p>
                <input accept=".json" onChange={(e) => this.upload(e)} className="btn btn-sm btn-info mx-auto" type="file" id="upload"/>               
            </div>
            
        </div>

        <button onClick={() => this.addCourse("test")} className="btn btn-lg btn-hover border mt-3 font-weight-bold">Add Class</button>
        <p> Click on the Logo at the Top or Bottom of page or any percentage sign to view Helper.</p>
        <hr/>
        
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
            calculation={this.calculation}
            isNumber={this.isNumber}/>
        )}

        <Footer/>   
      </div>
    );
  }
}

export default App;