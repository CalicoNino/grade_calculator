import React, { Component } from 'react';
import Grade from './grade';

class Course extends Component {
    render() {
        const { id, courseName, grades, desGrade, deleteCourse, addGrade, deleteGrade, handleGrade, totalWeight, curGrade, handleDesiredGrade, handelCourseName } = this.props;
        return (
            <React.Fragment>
                <div className="input-group mb-3">
                    <input type="text" id="courseName" className="form-control" value={courseName} onChange={e => handelCourseName(e, id)} 
                        maxlength="12" size="12" placeholder="Class Name" aria-label="Class Name" aria-describedby="basic-addon1"/>
                </div>
                <button className="btn btn-small btn-danger" onClick={() => deleteCourse(id)}>Delete Class</button>
                <button onClick={() => addGrade(id)} className="btn btn-small btn-primary">Add Grade</button>
                {grades.map(grade => 
                    <Grade
                        key={grade.id}
                        id={grade.id}
                        name={grade.name}
                        result={grade.result}
                        weight={grade.weight}
                        courseId={id}
                        deleteGrade={deleteGrade}
                        handleGrade={handleGrade}/>
                )}

                <table className="border">
                    <tbody>
                        <tr>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id="totalWeight" className="form-control" value={totalWeight(id)} 
                                        maxlength="2" size="2" placeholder="Total Weight" aria-label="Total Weight" aria-describedby="basic-addon1" readOnly/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id="examWeight" className="form-control" value={(100-totalWeight(id))} 
                                        maxlength="2" size="2" placeholder="Exam Weight" aria-label="Exam Weight" aria-describedby="basic-addon1" readOnly/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id="curGrade" className="form-control" value={curGrade(id)} 
                                        maxlength="2" size="2" placeholder="Current Grade" aria-label="Current Grade" aria-describedby="basic-addon1" readOnly/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id="desGrade" className="form-control" value={desGrade} onChange={e => handleDesiredGrade(e, id)} 
                                        maxlength="2" size="2" placeholder="Desired Grade" aria-label="Desired Grade" aria-describedby="basic-addon1"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>                                
                            </td>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id="reqFinal" className="form-control" value={((desGrade-curGrade(id))/(100-totalWeight(id)) * 100).toFixed(2)} 
                                        maxlength="2" size="2" placeholder="Requried Final Grade" aria-label="Requried Final Grade" aria-describedby="basic-addon1" readOnly/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <hr/>
            </React.Fragment>
         );
    }
}
 
export default Course;