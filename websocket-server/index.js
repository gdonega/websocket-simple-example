// Pega um objeto da biblioteca
const WebSocket = require('ws');

// Cria um novo websocket (que roda na porta 8080)
const wss = new WebSocket.Server({ port: 8080 });

// Sempre que um novo usuário se conectar ao websocket, será executado
// a função 'novoUsuarioConectado'
wss.on('connection', (conexao) => novoUsuarioConectado(conexao));


/**
 * Essa função deve ser executada sempre que um novo usuário se conectar
 * 
 * @param {WebSocket.WebSocket} conexao Conexão com o usuário
 */
function novoUsuarioConectado(conexao) {
    // Sempre que o usuário enviar uma mensagem através da conexão
    // Executa o método 'chegouNovaMensagem'
    conexao.on('message', (msg) => chegouNovaMensagem(conexao, msg))
}


/**
 * Essa função deve ser executada sempre que chegar uma nova mensagem do cliente
 * 
 * @param {WebSocket.WebSocket} conexao Conexão com o usuário
 * @param {WebSocket.RawData} msg Mensagem do usuário
 */
function chegouNovaMensagem(conexao, msg) {
    // Tenta converter o json para objeto
    let objRecebido
    try {
        objRecebido = JSON.parse(msg);
    } catch (error) {
        return conexao.send(`Json inválido`)
    }

    // De acordo com a ação, executa um código diferente
    switch (objRecebido?.acao) {
        case "PrintarNoConsoleERetornar":
            // Faz o log da informação
            console.log(`Chegou a mensgem: ${objRecebido.mensagem}`)


            // Envia a informação para todos os usuários conectados
            wss.clients.forEach(x => x.send(objRecebido.mensagem))
            break;

        default:
            conexao.send(`Acao inválida`)
            break;
    }
}