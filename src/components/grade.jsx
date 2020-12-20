import React, { Component } from 'react';

class Grade extends Component {
    render() {
        const { id, name, result, weight, courseId, deleteGrade, handle } = this.props;
        return (
            <div className="mx-auto">
                <table className="border mx-auto p-3 border-0">
                    <tbody>
                        <tr>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id={"name"+courseId+id} className="form-control" value={name} onChange={e => handle(e, courseId, id)} 
                                        size="12" placeholder="Task or Test Name" aria-label="Assignment or Test Name" aria-describedby="basic-addon1"/>
                                </div>
                            </td>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id={"result"+courseId+id} className="form-control" value={result} onChange={e => handle(e, courseId, id)} 
                                        size="2" placeholder="Grade" aria-label="Grade" aria-describedby="basic-addon1"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="input-group mb-3">
                                    <input type="text" id={"weight"+courseId+id} className="form-control" value={weight} onChange={e => handle(e, courseId, id)} 
                                        size="2" placeholder="Weight" aria-label="Weight" aria-describedby="basic-addon1"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </td>
                            <td><button className="btn btn-small btn-danger mb-3" onClick={() => deleteGrade(courseId, id)}>X</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Grade;