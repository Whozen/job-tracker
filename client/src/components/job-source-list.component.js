import React, { Component } from "react";
import { Link } from "react-router-dom";
import loader from '../assets/images/loader.gif';
import axios from "axios";

const Sources = props => (
    <div className="col-lg-4 col-sm-6 job-source">
        <Link to={"/job-source/" + props.source._id}>
            <div className="row">
                <div className="col-md-3 logo">
                    <img src={props.source.logo_file} alt={props.source.name} title={props.source.name} />
                </div>
                <div className="col-md-9 detail">
                    <p>{props.source.description}</p>
                    <span className="mark">{props.source.rating}</span>
                </div>
            </div>
        </Link>
    </div>
)

export default class JobSourceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobSources: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER_PATH + 'jobsources/')
        .then(response => {
            console.log(response.data);
            this.setState({
                jobSources: response.data,
                loading: false
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    jobSourceList() {
        return this.state.jobSources.map(currentSource => {
            return <Sources source={currentSource} key={currentSource._id} />
        });
    }

    render() {
        return (
            <div className="main-content">
                <h1>Job Sources</h1>
                {this.state.loading
                    ? <div className="loader"><img src={loader} alt="Loading" /></div>
                    : <div className="job-source-list three-col-list">
                        <div className="row">
                            { this.jobSourceList() }
                        </div>
                    </div>
                }
            </div>
        );
    }
};