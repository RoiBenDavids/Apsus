import { NoteControlers } from './NoteControlers.jsx'
// import pin from '../../assets/img/pin.png'
// import pin from '../../assets/img/pin.png'
export class NoteImg extends React.Component {


    state={
       txt:this.props.note.info.title
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    handleSubmit = () => {
        event.preventDefault();
        var txt = this.state.txt
        this.props.onEdit(txt, this.props.note.id)
    }

    getPinClass = () => {
        let pinClass=(this.props.note.isPinned) ? 'pin' : 'pin unshown'
        console.log(pinClass);
        return pinClass
    }




    render() {

        return (
            <div style={{ backgroundColor: `${this.props.note.color}` }} className='keep-note'>
                <img className={this.getPinClass()} src="http://www.pngall.com/wp-content/uploads/4/Red-Pin-PNG.png" alt="" />
                <form onSubmit={this.handleSubmit}>
                    <input className='note-title' value={this.state.txt} type="text" placeholder="Note title"
                        onChange={this.handleChange} />
                </form>
                <img className="note-img" src={this.props.note.info.url} alt="img" />
                <NoteControlers onEdit={this.props.onEdit}
                 onChangeColor={this.props.onChangeColor}
                  onChangePinned={this.props.onChangePinned} 
                  onDelete={this.props.onDelete}
                   noteId={this.props.note.id} 
                   onShare={this.props.onShare}
                   txt={this.state.txt}/>
            </div>
        )
    }

}

