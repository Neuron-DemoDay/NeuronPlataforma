export const promptGames = (quantidade,tema,estruturaResposta) => 
    `Busque aleatoriamente por ${quantidade} ${tema}. 
    Coloque os elementos em seus respectivos lugares mantendo o seguinte formato JSON, 
    sem adicionar nenhum outro texto, explicação ou comentário na resposta.
{
    ${estruturaResposta}
}`