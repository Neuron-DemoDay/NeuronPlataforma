export const promptGames = (quantidade,tema,estruturaResposta) => 
    `Busque aleatoriamente por ${quantidade} ${tema}. 
    Não adicione nenhum tipo de texto escrito JSON ou aspas. Coloque a resposta somente na estrutura a seguir.
{
    ${estruturaResposta}
}`