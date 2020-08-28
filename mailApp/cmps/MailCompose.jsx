export class MailCompose extends React.Component {
    state={
        to:'',
        subject:'',
        body:''
       
    }

    componentDidMount() { 
       console.log( this.props.noteToCompose.body);
        if (this.props.noteToCompose) this.setState({subject:'From my notes '+this.props.noteToCompose.subject,body:this.props.noteToCompose.body})
     
     
    }
    onInputChange=(ev)=>{
        this.setState({[ ev.target.name]: ev.target.value})
    }
    

    render() {
 
        return (
            <form className='compose-mail flex column' onSubmit={()=>this.props.cb(event,this.state)}>
                <div className={'compose-header flex justify-between align-center'}><p>New Message</p><p onClick={()=> this.props.toggleCompose() }>X</p></div>
                <input type='text' name='to' placeholder='to' value={ this.state.to } onChange={this.onInputChange}/>
                <input type='text' name='subject' placeholder='subject' value={ this.state.subject } onChange={this.onInputChange}/>
                <textarea name='body' text={ this.state.body } onChange={this.onInputChange} value={ this.state.body }/>
               <div className='compose-footer flex align-center'><button>send</button></div>
                

            </form>
            
        )
    }
}