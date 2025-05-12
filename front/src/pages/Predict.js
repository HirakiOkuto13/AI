import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import GifControl2 from '../components/GifCon2';

class Predict extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            High: null,
            Low: null,
            Open: null,
            hasYard: null,
            isNewBuilt: null,
            predict: null,
            AdjClose: 0
        }
    }

    handleNumberChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: String(value)
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/predict', this.state).then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
                AdjClose: res.data.AdjClose
            })
          }
        }).catch(error => {
          console.log(error);
        });
    }

    handleCreate = () => {
        axios.get("http://localhost:3001/recreatemodel").then(res => {
            console.log(res.data);
            if(res.data){
                alert("Success")
            }
        }).catch(error => {
          console.log(error);
          alert("Failed")
        });
    }

    render(){
        return(
            <main>
                <section id="hero2">
                <div className="container py-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                        <Link to="/all" className="btn btn-dark btn-block mb-2">ข้อมูลทั้งหมด</Link>
                                        <Link to="/adddata" className="btn btn-danger btn-block mb-2">เพิ่มข้อมูล</Link>
                                        
                                        <button type="button" className="btn btn-lg btn-block btn-warning" onClick = {this.handleCreate}>สร้าง Regression Model</button>
                                        
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>High</label>
                                                    <input type="string" step="0.00000000000001" className="form-control" name="High" placeholder="High" onChange={this.handleNumberChange} value={this.state.High} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Low</label>
                                                    <input type="string" step="0.00000000000001" className="form-control" name="Low" placeholder="Low" onChange={this.handleNumberChange} value={this.state.Low} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Open</label>
                                                    <input type="string" step="0.00000000000001" className="form-control" name="Open" placeholder="Open" onChange={this.handleNumberChange} value={this.state.Open} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Close</label>
                                                    <input type="string" step="0.00000000000001" className="form-control" name="Close" placeholder="Close" onChange={this.handleNumberChange} value={this.state.Close} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Volume</label>
                                                    <input type="string" step="0.00000000000001" className="form-control" name="Volume" placeholder="Volume" onChange={this.handleNumberChange} value={this.state.Volume} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-lg btn-block btn-info">แนะนำราคา</button>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div class="alert alert-warning" role="alert">
                                                    <h1 className='text-center'>ราคาดัชนีอ้างอิงผลการลงทุน : {(this.state.AdjClose).toLocaleString()} </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <br/>
                                    <div class="col-6 d-flex align-self-center">
                                        <GifControl2/>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </main>
        )
    }
}

export default Predict;