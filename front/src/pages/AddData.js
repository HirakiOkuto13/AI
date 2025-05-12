import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router';

class AddData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            High: 0,
            Low: 0,
            Open: 0,
            Close: 0,
            Volume: 0,
            AdjClose: 0,
            redirect: null
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
        [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/admin/add-adp', this.state).then(res => {
        console.log(res.data);
        if(res.data.result){
            alert("Success")
            this.setState({redirect: '/regression'});
        }
        }).catch(error => {
        console.log(error);
        });
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div className="container py-5">
            <div class="col-lg-13 m-auto">
                <h1 class="h1-white"><strong>เพิ่มข้อมูล</strong></h1>
            </div>
            <div className="row">
                    <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label class="white-font">High</label>
                        <input type="text" name="High" class="form-control" placeholder="High" onChange={this.handleChange} value={this.state.High}/>
                    </div>
                    <div class="form-group">
                        <label class="white-font">Low</label>
                        <input type="text" name="Low" class="form-control" placeholder="Low" onChange={this.handleChange} value={this.state.Low}/>
                    </div>
                    <div class="form-group">
                        <label class="white-font">Open</label>
                        <input type="text" name="Open" class="form-control" placeholder="Open" onChange={this.handleChange} value={this.state.Open}/>
                    </div>
                    <div class="form-group">
                        <label class="white-font">Close</label>
                        <input type="text" name="Close" class="form-control" placeholder="Close" onChange={this.handleChange} value={this.state.Close}/>
                    </div>
                    <div class="form-group">
                        <label class="white-font">Volume</label>
                        <input type="text" name="Volume" class="form-control" placeholder="Volume" onChange={this.handleChange} value={this.state.Volume}/>
                    </div>
                    <div class="form-group">
                        <label class="white-font">Adj Close</label>
                        <input type="text" name="AdjClose" class="form-control" placeholder="AdjClose" onChange={this.handleChange} value={this.state.AdjClose}/>
                    </div>
                    <button type="submit" class="btn btn-primary">บันทึก</button>
                    </form>
                    <br />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddData;