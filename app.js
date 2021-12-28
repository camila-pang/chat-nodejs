var app = require('./config/server');

var server = app.listen(3000, function(){
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);//set serve para deixar a variavel global, se tornar acessivel para outra pagina

//criar a conexao por websocket
io.on('connection', function(s){
   console.log('Usuario conectou');

   s.on('disconnect', function(){
       console.log('Usuario desconectou')
   });

   s.on('msgParaServidor', function(data){
        s.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        s.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );
      if(parseInt(apelido_atualizado_nos_clientes) == 0){
        s.emit(
            'participantesParaCliente', 
            {apelido: data.apelido}
        );

        s.broadcast.emit(
            'participantesParaCliente', 
            {apelido: data.apelido}
        );
    }


   });

});