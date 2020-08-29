export function Color({ noteId, onChangeColor, colorClose }) {

    var onChooseColor = (noteId, color) => {
        onChangeColor(noteId, color);
        colorClose();
    }

    return (
        <div className='color-picker'>
            <button onClick={() => { onChooseColor(noteId, "#ea5455") }} style={{ backgroundColor: "#ea5455" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#8fc0a9") }} style={{ backgroundColor: "#8fc0a9" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#8675a9") }} style={{ backgroundColor: "#8675a9" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#ffc1fa") }} style={{ backgroundColor: "#ffc1fa" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#ede682") }} style={{ backgroundColor: "#ede682" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#ffa931") }} style={{ backgroundColor: "#ffa931" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#12cad6") }} style={{ backgroundColor: "#12cad6" }}></button>
            <button onClick={() => { onChooseColor(noteId, "#c70039") }} style={{ backgroundColor: "#c70039" }}></button>
        </div>
    )

}