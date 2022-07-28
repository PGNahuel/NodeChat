// alert('bienvenido');

const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
    return (`<li>
            <strong> ${elem.author}</strong>:
            <span> ${elem.text}</span> 
        </li>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) { 
    render(data); 
    document.getElementById("messages").scrollTop += 100;
});

function addMessage(e) {
    if(document.getElementById('username').value && document.getElementById('texto').value){
        const mensaje = {
            author: document.getElementById('username').value,
            text: document.getElementById('texto').value
        };

        document.getElementById('texto').value = '';
        
        socket.emit('new-message', mensaje);
    }
    setTimeout(document.getElementById('texto').focus(),5);
    
    return false;
}