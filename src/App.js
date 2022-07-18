import { Component } from "react";
import DummyData from "./DummyData";
export default class App extends Component
{
  constructor(){
    super()
    this.state = {
      students : DummyData,
      duplicateRoll : false,
      duplicateEmail : false
    }
  }

  clear = ()=>{
    this.rollbox.value=''
    this.namebox.value=''
    this.emailbox.value=''
    this.phybox.value=''
    this.chebox.value=''
    this.mathbox.value=''
  }

  save = (event)=>{
    var roll = this.rollbox.value*1;
    var name = this.namebox.value;
    var email = this.emailbox.value;
    var marks = {
      physics : this.phybox.value*1,
      chemistry : this.chebox.value*1,
      maths : this.mathbox.value*1
    }

    var obj = {roll,name,email,marks}

    this.setState({students:[...this.state.students,obj]})
    this.clear()
    event.preventDefault() // Cancel Submit Event
  }

  checkRoll = ()=>{
    var roll = this.rollbox.value*1;
    var status = this.state.students.some(ob=>ob.roll==roll)
    this.setState({duplicateRoll:status})
  }

  checkEmail = ()=>{
    var email = this.emailbox.value;
    var status = this.state.students.some(ob=>ob.email==email)
    this.setState({duplicateEmail:status})
  }

  render(){
    return <div>
        <h1 className="alert alert-primary text-center">Student Records</h1>

        <div className="container">

          <form onSubmit={this.save}>

          <div className="form-group">
          <div className="row">
              <div className="col-lg-4 col-md-4">
                <input type="text" ref={ob=>this.rollbox=ob} 
                onBlur={this.checkRoll}
                onFocus={()=>this.setState({duplicateRoll:false})}
                className="form-control" placeholder="Roll Number" required/>
              </div>
              <div className="col-lg-4 col-md-4">
              <input type="text" ref={ob=>this.namebox=ob} className="form-control" placeholder="Student Name" required/>
              </div>
              <div className="col-lg-4 col-md-4">
              <input type="email" ref={ob=>this.emailbox=ob} 
              onBlur={this.checkEmail}
              onFocus={()=>this.setState({duplicateEmail:false})}
              className="form-control" placeholder="Email" required/>
              </div>
          </div>
          </div>
          <div className="form-group">
          <div className="row">
              <div className="col-lg-4 col-md-4">
                <input type="number" ref={ob=>this.phybox=ob} className="form-control" placeholder="Physics" required/>
              </div>
              <div className="col-lg-4 col-md-4">
              <input type="number" ref={ob=>this.chebox=ob} className="form-control" placeholder="Chemistry" required/>
              </div>
              <div className="col-lg-4 col-md-4">
              <input type="number" ref={ob=>this.mathbox=ob} className="form-control" placeholder="Maths" required/>
              </div>
          </div>
          </div>
          <div className="form-group">
          <div className="row">
              <div className="col-lg-4 col-md-4">
                <button 
                disabled={this.state.duplicateRoll || this.state.duplicateEmail}
                className="btn btn-success" type="submit">Save Student</button>
              </div>
              <div className="col-lg-4 col-md-4">
                <b className="text-info">Total Student : {this.state.students.length}</b>
              </div>
              <div className="col-lg-4 col-md-4">
                <b className="text-danger">
                  {this.state.duplicateRoll?"Roll Number Already Exist !":""}
                  <br/>
                  {this.state.duplicateEmail?"Email Already Exist !":""}
                </b>
              </div>
          </div>
          </div>    
          </form>
        </div>
        <hr/>

        <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Physics</th>
                <th>Chemistry</th>
                <th>Maths</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((obj,index)=><tr>
                    <td>{index+1}</td>
                    <td>{obj.roll}</td>
                    <td>{obj.name}</td>
                    <td>{obj.email}</td>
                    <td>{obj.marks.physics}</td>
                    <td>{obj.marks.chemistry}</td>
                    <td>{obj.marks.maths}</td>
                    <td>{obj.marks.physics+obj.marks.chemistry+obj.marks.maths}</td>
                </tr>
              )}
            </tbody>
        </table>
    </div>
  }
}