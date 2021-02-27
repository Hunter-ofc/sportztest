import React, { Component } from 'react';
import Axios from 'axios';

export class FirstPg extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            playersInfo: [],
            replicaPlayersInfo: [],
        }
    }

    componentDidMount() {

        Axios.get("https://api.npoint.io/d6bd0efc05639084eb17/")
        .then(response => {
            let modifiedState = this.state;
            modifiedState.playersInfo = response.data.playerList;
            modifiedState.replicaPlayersInfo = response.data.playerList;

            this.setState(modifiedState);
        })
        .catch(error => {
            console.log(error);
        });
    }

    onChanged = (e) => {
        let modifiedState = this.state;

        let searchString = e.target.value.toLowerCase();
        modifiedState.playersInfo = e.target.value.length > 0 ? this.state.playersInfo.filter((strSearch) => {
            let searchValue = strSearch['PFName'].toLowerCase() + strSearch['TName'].toLowerCase();
            return searchValue.indexOf(searchString) !== -1;
        }) : this.state.replicaPlayersInfo;

        this.setState(modifiedState);
    }
    
    render() {

        return (
            <div className='container-fluid'>
                <div style={{marginTop: '1rem'}}>
                    <span>Seacrh: </span>
                    <input type='text' onChange={this.onChanged}/>
                </div>
                <div className='row' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    {
                        this.state.playersInfo.map((singlePlayerInfo, index) => {
                            return <div className='playerCard' key={index}>
                                        <img className="card-img-top" src={require(`../IMAGES/${singlePlayerInfo.Id}.jpg`).default} alt="Card image"/>
                                        <div className="card-body">
                                            <h4>{singlePlayerInfo['PFName']}</h4>
                                            <p>Skill: {singlePlayerInfo['SkillDesc']}</p>
                                            <p>Value: ${singlePlayerInfo['Value']}</p>
                                            <p>Upcoming Match: {singlePlayerInfo['UpComingMatchesList'][0]['CCode']} vs. {singlePlayerInfo['UpComingMatchesList'][0]['VsCCode']}</p>
                                            <p>Next Match Time: {singlePlayerInfo['UpComingMatchesList'][0]['MDate'].replaceAll('/', '-')}</p>                                            
                                        </div>
                                    </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FirstPg