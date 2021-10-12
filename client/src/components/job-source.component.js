import React, { Component } from "react";
import { Link } from "react-router-dom";
import loader from '../assets/images/loader.gif';
import axios from "axios";

const Oppr = props => (
    <tr>
        <th scope="row">{props.data.id}</th>
        <td>{props.data.companyName}</td>
        <td>{props.data.jobTitle}</td>
        <td><a href={props.data.jobURL} rel="noreferrer" target="_blank">{props.data.jobURL}</a></td>
    </tr>
)

export default class JobSource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobOppr: [],
            sourceName: '',
            loading: true
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/jobopprties/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                jobOppr: response.data,
                loading: false
            }); 
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('http://localhost:5000/jobsources/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                sourceName: response.data
            })   
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    jobOpprList() {
        return this.state.jobOppr.map(currentOppr => {
            return <Oppr data={currentOppr} key={currentOppr._id} />
        });  
    }
    
    render() {
        return (
            <div className="main-content">
                {this.state.loading
                    ? <div className="loader"><img src={loader} alt="Loading" /></div>
                    : <div className="section">
                        <div className="section-title">
                            <h3>Job Source: {this.state.sourceName}</h3>
                            {this.state.jobOppr.length > 0
                                ? <p>{this.state.jobOppr.length} opportunities available</p>
                                : ''
                            }
                            <Link to={"/"} className="btn btn-secondary btn-lg back-btn">Back</Link>
                        </div>
                        
                        <div className="section-body">
                            {this.state.jobOppr.length > 0
                                ? <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">Job Title</th>
                                            <th scope="col">Job URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.jobOpprList() }
                                    </tbody>
                                </table>
                                : <p>Sorry, no job opportunities available from this source.</p>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
};