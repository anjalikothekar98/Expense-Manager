import React from "react";
class Total extends React.Component{
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
        return (
        <div className="total">
            <h1>Your Balance: {this.state.total}</h1>
            </div>

    )
    }
}
export default Total;