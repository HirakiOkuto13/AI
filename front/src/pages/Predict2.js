import React from 'react';
import axios from 'axios';

import GifControl from '../components/GifCon';

class Predict2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ph: null,
            Hardness: null,
            Solids: null,
            Chloramines: null,
            Sulfate: null,
            Conductivity: null,
            Organic_carbon: null,
            Trihalomethanes: null,
            Turbidity: null,
            predict: null,
            Potability: -1
        }
    }

    handleNumberChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: parseFloat(value)
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/predict2', this.state).then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
                Potability: res.data.Potability
            })
          }
        }).catch(error => {
          console.log(error);
        });
    }

    handleCreate = () => {
        axios.get("http://localhost:3001/recreatemodel2").then(res => {
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
        let message;
        if (this.state.Potability > 0) {
            message = 'กินได้';
        } else if(this.state.Potability === 0){
            message = 'กินไม่ได้';
        }else{
            message = 'ไม่มีข้อมูล';
        }

        return(
            <main>
                <div className="container py-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">

                                <div class="col-6 d-flex align-self-center">
                                    <GifControl/>
                                </div>
                                
                                <div class="col-6">
                                <button type="button" className="btn btn-lg btn-block btn-warning" onClick = {this.handleCreate}>สร้าง Classification Model</button>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>PH</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="ph" placeholder="ph" onChange={this.handleNumberChange} value={this.state.ph} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Hardness</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Hardness" placeholder="Hardness" onChange={this.handleNumberChange} value={this.state.Hardness} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Solids</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Solids" placeholder="Solids" onChange={this.handleNumberChange} value={this.state.Solids} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Chloramines</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Chloramines" placeholder="Chloramines" onChange={this.handleNumberChange} value={this.state.Chloramines} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Sulfate</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Sulfate" placeholder="Sulfate" onChange={this.handleNumberChange} value={this.state.Sulfate} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Conductivity</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Conductivity" placeholder="Conductivity" onChange={this.handleNumberChange} value={this.state.Conductivity} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Organic_carbon</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Organic_carbon" placeholder="Organic_carbon" onChange={this.handleNumberChange} value={this.state.Organic_carbon} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Trihalomethanes</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Trihalomethanes" placeholder="Trihalomethanes" onChange={this.handleNumberChange} value={this.state.Trihalomethanes} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div class="form-group">
                                                    <label>Turbidity</label>
                                                    <input type="number" step="0.00000000000001" className="form-control" name="Turbidity" placeholder="Turbidity" onChange={this.handleNumberChange} value={this.state.Turbidity} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-lg btn-block btn-info">ตรวจสอบ</button>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                                <div className="col-md-12">
                                                    <div class="alert alert-warning" role="alert">
                                                        <h1 className='text-center'>น้ำจากแหล่งนี้ : {message} </h1>
                                                    </div>
                                                </div>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Predict2;