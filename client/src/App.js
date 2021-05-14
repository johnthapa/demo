import React from "react";
import './App.css';
import Axios from 'axios';

class App extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        mode            : 'list',
        listing         : '',
        searchQuery     : '',
        currentEditData : '', 
      }
    }

    componentDidMount() {
      this.getAllData()
    }

    getAllData() {
      Axios.get('http://localhost:3001/').then((response) => {
          this.setState({ listing : response.data, mode: 'list', searchQuery: ''  });
      })
    }

    submitSearchQuery($type) {
      Axios.post('http://localhost:3001/api/searchData',{
        query: this.state.searchQuery
      }).then((response) => {
         this.setState({ listing : response.data });
      });
    }

    editForm(value) {
      this.setState({
        restaurant_id : value.restaurant_id,
        name : value.name,
        address : value.address,
        url : value.url,
        neighbourhood : value.neighbourhood,
        longitude : value.longitude,
        latitude : value.latitude,
        mode : 'edit',
      })
    }

    updateData() {
      var data = {
        restaurant_id   : this.state.restaurant_id,
        name : this.state.name,
        address : this.state.address,
        neighbourhood : this.state.neighbourhood,
        longitude : this.state.longitude,
        latitude : this.state.latitude,
        url : this.state.url,
      }
      Axios.post('http://localhost:3001/api/updateData',{
        data: data
      }).then((response) => {
          this.getAllData()
      });
    }

    render() {
      return(
        <div className="App">

            {
              /*Listing Section*/
              (this.state.listing.length > 0 && this.state.mode == 'list')?
                <div class="wrapper">
                <h1>Demo Project</h1>

                {/*search section*/}
                <div class="searchWrapper">
                  <input type="text" name="searchRestaurant" value={this.state.searchQuery} placeholder="Search Restaurant" onChange={(e) =>{
                   this.setState({ searchQuery : e.target.value  }) 
                  }} />
                    <button onClick={() => { this.submitSearchQuery('restaurant') }}>Search</button>
                    <br />
                    <br />
                    <button onClick={() => { this.getAllData() }}>Clear search</button>
                  </div>
                  <div class="searchWrapper">
                    {/*<input type="text" name="searchItem" placeholder="Search Item" />*/}
                    {/*<button>Search</button>*/}
                  </div>
                {
                this.state.listing.map((val, key) => {
                return(
                  <div class="item" key={key}>
                    <h3 onClick={()=>{this.editForm(val)}}>{val.name}</h3>
                  </div>
                )
                })
                }
                </div>
              :
                <div class="editMode">
                  <h1>Update Restaurant</h1>
                  <label>Name</label>
                  <input type="text" name="name" value={this.state.name} onChange={(e) => { this.setState({ name : e.target.value  }) }} />
                  <label>Address</label>
                  <input type="text" name="address" value={this.state.address} onChange={(e) => { this.setState({ address : e.target.value  }) }} />
                  <label>Url</label>
                  <input type="text" name="url" value={this.state.url} onChange={(e) => { this.setState({ url : e.target.value  }) }} />
                  <label>Neighbourhood</label>
                  <input type="text" name="neighbourhood" value={this.state.neighbourhood} onChange={(e) => { this.setState({ neighbourhood : e.target.value  }) }} />
                  <label>longitude</label>
                  <input type="text" name="longitude" value={this.state.longitude} onChange={(e) => { this.setState({ longitude : e.target.value  }) }} />
                  <label>latitude</label>
                  <input type="text" name="latitude" value={this.state.latitude} onChange={(e) => { this.setState({ latitude : e.target.value  }) }} />
                  <div class="updatebtn">
                    <button onClick={() => { this.updateData() }}>Update</button> 
                    <button onClick={() => { this.setState( { mode : 'list' } ) }}>Cancel</button> 
                 </div>
                </div>                  
            }

        </div>
      )
    }

}

export default App;
