 import React from "react";
 import Button from '@mui/material/Button';
 import Divider from '@mui/material/Divider';
 import Grid from '@mui/material/Grid';
 import TextField from '@mui/material/TextField';
 import Total from "./Total.js";
//  import Data from "./Data.json";
//  import ListShow from "./ListShow";

class products extends React.Component{
    constructor(props){
        super(props);
       let d=JSON.parse(localStorage.getItem('data'));
       if(d)
       {
           this.state = {
               data: d,
               expense: '',
               description: '',
               price: '',
            //    total: '',
           }
       }else{
           this.state = {
               data:[],
               expense: '',
               description: '',
               price: '',
            //    total:'',
           }
       }
       
        this.add=this.add.bind(this);
        this.updateExpense=this.updateExpense.bind(this);
        this.updateDesription=this.updateDesription.bind(this);
        this.updatePrice=this.updatePrice.bind(this);
        this.delete = this.delete.bind(this);
        // this.total = this.total.bind(this);
    }
    add(e){
        e.preventDefault();
        let data=this.state.data;
        // console.log('data: ',data);
        let expense=this.state.expense;
        let today = new Date();
        let description= this.state.description;
        let price = this.state.price;
        if (price && expense){
            console.log("description", description)
            data.push({ expense: expense, description: description, price: price, delete: false });
            console.log("updated data: ",data);
            this.setState({ data: data, expense: '', description: '', price: '' });
            localStorage.setItem('data', JSON.stringify(data));
            this.total();
        }
       
    }
    updateExpense(event){
        let price=this.state.price;
        let expense = this.state.expense;
        event.target.id == 'expense'  ? (this.setState({ expense : event.target.value })): (this.setState({ price : event.target.value})) ;
       let check=this.state;
        // console.log('check:',check);
    }
    updateDesription(event){
        let price=this.state.price;
        let description = this.state.description;
        event.target.id == 'description'  ? (this.setState({ description : event.target.value })): (this.setState({ description : event.target.value})) ;
       let check=this.state;
    }
    updatePrice(event){
        let price=this.state.price;
        let expense = this.state.expense;
        let description = this.state.description;
        event.target.id == 'price'  ? (this.setState({ price : event.target.value })): (this.setState({ price : event.target.value})) ;
       let check=this.state;
    }
    delete(index){
        console.log(index);
        let data=this.state.data;
        data.splice(index,1);
        this.setState({data});
        localStorage.setItem('data', JSON.stringify(data));
        this.total();
    }
    total(){
        let data=this.state.data;
        if(data)
        {
            let result = 0;
            data.forEach(element => {
                console.log('total:', element);
                result += parseFloat(element.price);
            });
            console.log('result', result);
            this.setState({ total: result });
        }
     
    }
    componentDidMount(){
        this.total();
    }
render(){    
    return(
       
        <div className="wrapper" style={{backgroundColor: "D9D9D9"}}>
        <div className="userinput">
        <div><h1>Expense tracker</h1></div>
        <h3>Add Your Expense</h3>
        <Divider/>
        <Total total={this.props.total}/>
        <form>
        <div>
        <TextField
          id="expense"
          type="text"
          style={{width: "400px", height: "10px", borderRadius: "10px",padding: "20px 20px"}}
          onChange={this.updateExpense} id="expense" placeholder="Title:" value={this.state.expense}
        />
        </div><br/>
        <div>
        <TextField
          id="description"
          type="text"
          style={{width: "400px", height: "10px", borderRadius: "10px",padding: "20px 20px"}}
          onChange={this.updateDesription} placeholder="Description:" value={this.state.description}
        />
            </div>
            <br/>
            <div>
            <TextField
            id="price"
          style={{width: "400px", height: "10px", borderRadius: "10px",padding: "20px 20px"}}
          type="number"
          onChange={this.updatePrice}  placeholder="Price:" value={this.state.price}
          />
                </div>
                <br/>
                <div>
                <Button color="success" variant="contained" style={{width: "400px", height: "10px",padding: "30px 30px", marginTop: "20px"}} onClick={this.add} className="btn">Add transaction</Button>
                </div>
        </form>
        </div>

        <Divider style={{marginTop: "20px"}} />
            <div className="ListShow">
            <h1>Add new transaction</h1>
            <Grid container spacing={2}>
  <Grid item xs={3}>
  </Grid>
  <Grid item xs={1} style={{fontFamily: "sans-serif", fontWeight: 800}}>
      Expense
      </Grid>
      <Grid item xs={1} style={{fontFamily: "sans-serif", fontWeight: 800}}>
      Description
      </Grid>
      <Grid item xs={1} style={{fontFamily: "sans-serif", fontWeight: 800}}>
      Price
      </Grid>
      <Grid item xs={1} style={{fontFamily: "sans-serif", fontWeight: 800}}>
      Delete Item
      </Grid>
      <Grid item xs={1} style={{fontFamily: "sans-serif", fontWeight: 800}}>
      Edit Item
      </Grid>
          </Grid>

        <ul>
            {this.state.data.map((data,index)=>{
                // console.log('map: ',data);
                       return <ListShow data={data} index={index} key={index} delete={this.delete}/>
            })}
            <br/>
        </ul>
        </div>
        </div>
    )
}
}
class ListShow extends React.Component{
    render(){
        return(
            
            <div>
            <Grid container spacing={2}>
<Grid item xs={3}>
</Grid>
<Grid item xs={1}>
<span className="expenses" style={{fontFamily: "sans-serif", fontWeight: 500}}>{this.props.data.expense}</span>
</Grid>
<Grid item xs={1}>
<span className="description" style={{fontFamily: "sans-serif", fontWeight: 500}}>{this.props.data.description}</span>
</Grid>
<Grid item xs={1}>
<span className="price" style={{fontFamily: "sans-serif", fontWeight: 500}}>{this.props.data.price}</span>
</Grid>
<Grid item xs={1}>
<Button color="error" variant="outlined" style={{width: "100px", height: "10px",padding: "17px 17px"}}  onClick={(e)=>{
            e.stopPropagation();  
            this.props.delete(this.props.index)}} className="btn">Delete</Button>
</Grid>
<Grid item xs={1}>
<Button color="secondary" variant="outlined" style={{width: "100px", height: "10px",padding: "17px 17px"}}  onClick={(e)=>{
            e.stopPropagation();  
            this.props.delete(this.props.index)}} className="btn">Edit</Button>

</Grid>
<Grid item xs={3}>
</Grid>
</Grid>
</div>
    
        )
    }
}

export default products;

