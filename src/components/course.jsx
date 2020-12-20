import React, { Component } from 'react';
import Grade from './grade';

class Course extends Component {
    render() {
        const { id, courseName, grades, desGrade, deleteCourse, addGrade, deleteGrade, handle, calculation } = this.props;
        return (
            <React.Fragment>
                <div className="row mx-3">
                    <div className="len ml-auto">
                        <div className="scroll mx-auto mb-4 bg-secondary rounded">
                        {grades.map(grade => 
                            <Grade
                                key={grade.id}
                                id={grade.id}
                                name={grade.name}
                                result={grade.result}
                                weight={grade.weight}
                                courseId={id}
                                deleteGrade={deleteGrade}
                                handle={handle}/>
                            )} 
                        </div>
                    </div>
                    
                    <div className="mr-auto">
                        <div className="input-group p-3 mx-auto">
                            <input type="text" id={courseName+id} className="form-control" value={courseName} onChange={e => handle(e, id)} 
                                size="12" placeholder="Class Name" aria-label="Class Name" aria-describedby="basic-addon1"/>
                            <button onClick={() => deleteCourse(id)} className="btn btn-sm btn-danger">Delete Class</button>
                        </div>

                        <button onClick={() => addGrade(id)} className="btn btn-sm btn-primary mb-2">Add Grade</button> <br/>
                        <div className="my-auto rounded border bg-secondary text-light">
                            <table className="m-3 text-left">
                            <tbody>
                                <tr>
                                    <td>                              
                                        Total Weight:
                                    </td>
                                    <td>
                                        <div className="input-group mb-3">
                                            <input type="text" id={"totalWeight"+id} className="form-control" value={calculation(id)[0]} 
                                                size="2" placeholder="Total Weight" aria-label="Total Weight" aria-describedby="basic-addon1" readOnly/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    Exam Weight: 
                                    <td>
                                        <div className="input-group mb-3">
                                            <input type="text" id={"examWeight"+id} className="form-control" value={(100-calculation(id)[0])} 
                                                size="2" placeholder="Exam Weight" aria-label="Exam Weight" aria-describedby="basic-addon1" readOnly/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    Current Grade:
                                    <td>
                                        <div className="input-group mb-3">
                                            <input type="text" id={"curGrade"+id} className="form-control" value={calculation(id)[1]} 
                                                size="2" placeholder="Current Grade" aria-label="Current Grade" aria-describedby="basic-addon1" readOnly/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Desired Grade:
                                    </td>
                                    <td> 
                                        <div className="input-group mb-3">
                                            <input type="text" id={"desGrade"+id} className="form-control" value={desGrade} onChange={e => handle(e, id)} 
                                                size="2" placeholder="Desired Grade" aria-label="Desired Grade" aria-describedby="basic-addon1"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>                                
                                    </td>
                                </tr>
                                <tr>
                                    Grade Needed <br/>on Final
                                    <td>
                                        <div className="input-group mb-1">
                                            <input type="text" id={"reqFinal"+id} className="form-control" value={((desGrade-calculation(id)[1])/(100-calculation(id)[0]) * 100).toFixed(2)} 
                                                size="2" placeholder="Requried Final Grade" aria-label="Requried Final Grade" aria-describedby="basic-addon1" readOnly/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>  
                    </div>
                </div>
                <hr/>
            </React.Fragment>
            
         );
    }
}
 
export default Course;