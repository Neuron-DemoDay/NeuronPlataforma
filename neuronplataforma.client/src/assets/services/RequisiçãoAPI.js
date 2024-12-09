import axios from "axios";

export const fetchTalkingGemini = async (prompt) =>{
    try{
        const response = await axios.post('http://localhost:3000/TalkingWithGemini', {
            prompt: prompt
            
        })
        const responseJson = JSON.stringify(response.data)
        console.log(JSON.parse(responseJson))
        return response.data.correspondence
    }
    catch (error) {
        console.error("Erro ao buscar os elementos da API", error)
        throw error
    }
}