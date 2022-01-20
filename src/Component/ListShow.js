import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

class ListShow extends React.Component{
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
        this.update=this.update.bind(this);
        this.delete = this.delete.bind(this);
        // this.total = this.total.bind(this);
    }
    add(e){
        e.preventDefault();
        let data=this.state.data;
        // console.log('data: ',data);
        let expense=this.state.expense;
        let description= this.state.description;
        let price = this.state.price;
        if (price && expense){
            data.push({ expense: expense, description: description, price: price, delete: false });
            console.log("updated data: ",data);
            this.setState({ data: data, expense: '', description: '', price: '' });
            localStorage.setItem('data', JSON.stringify(data));
            this.total();
        }
       
    }
    update(event){
        let price=this.state.price;
        let expense = this.state.expense;
        let description = this.state.description;
        event.target.id == 'expense' && 'description' ? (this.setState({ expense : event.target.value })) : (this.setState({ price : event.target.value})) ;
       let check=this.state;
        // console.log('check:',check);
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
            <div>
                <Grid container spacing={2}>
  <Grid item xs={3}>
  </Grid>
  <Grid item xs={1}>
  <span className="expenses" style={{fontFamily: "sans-serif", fontWeight: 500}}>{this.state.data.expense}</span>
  </Grid>
  <Grid item xs={1}>
  <span className="description" style={{fontFamily: "sans-serif", fontWeight: 500}}>{this.state.data.description}</span>
  </Grid>
  <Grid item xs={1}>
  <span className="price" style={{fontFamily: "sans-serif", fontWeight: 500}}>{this.state.data.price}</span>
  </Grid>
  <Grid item xs={1}>
  <Button color="error" variant="outlined" style={{width: "100px", height: "10px",padding: "17px 17px"}}  onClick={(e)=>{
                e.stopPropagation();  
                this.state.delete(this.state.index)}} className="btn">Delete</Button>
  </Grid>
  <Grid item xs={1}>
  <Button color="secondary" variant="outlined" style={{width: "100px", height: "10px",padding: "17px 17px"}}  onClick={(e)=>{
                e.stopPropagation();  
                this.state.delete(this.state.index)}} className="btn">Edit</Button>

  </Grid>
  <Grid item xs={3}>
  </Grid>
  </Grid>
  </div>
        );
    }
}
export default ListShow;