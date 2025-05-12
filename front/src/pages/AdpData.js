import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AdpData extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get("http://localhost:3001/admin/adp").then((res) => {
            this.setState({data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    handleDelete = (id) => {
        console.log(id);
        axios.get('http://localhost:3001/admin/delete-adp?id='+id).then(res => {
          console.log(res.data);
          if(res.data.result){
            this.getData();
          }
        }).catch(error => {
          console.log(error);
        });
    }

    render(){
        return(
            <section class="container py-5">
        <div class="row text-center pt-3">
            <div class="col-lg-12 m-auto">
                <h1 class="h1-white">ข้อมูล</h1>
            </div>
            <div className='col-md-12'>
                <table className="table table-bordered table-striped table-dark">
                    <tr style={{textAlign: "center"}}>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>Volume</th>
                        <th>AdjClose</th>
                    </tr>
                    {this.state.data.slice(-10).map(item => (
                        <tr >
                            <td>{item.High}</td>
                            <td>{item.Low}</td>
                            <td>{item.Open}</td>
                            <td>{item.Close}</td>
                            <td>{item.Volume}</td>
                            <td>{item.AdjClose}</td>
                            <td>
                                <Link to={"/edit-adp/"+item.id} className="btn btn-info mb-1" style={{background: "#17A2B8", width: "100%"}}>Update</Link> 
                                <button className="btn btn-danger" style={{background: "#BE2535", width: "100%"}} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(item.id) } }>Delete</button>
                            </td>
                        </tr>
                    ))}
                 </table>
            </div>
        </div>
        
    </section>
        )
        }
}

export default AdpData;


