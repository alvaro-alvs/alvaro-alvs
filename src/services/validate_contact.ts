import type { ContactType } from "@/types/OxxTypes";



export const ValidateContact = ({data, setValidate}: {data: ContactType, setValidate: () => void}) => {
    //* Verificação raiz
    if (data) {
        //* Verificação de campos
        if (data.nome && data.email || data.telefone) {

            //* Verificação dos dados
            if (data.nome.length > 2 && data.email.length > 3 && data.email.includes("@")) {
                return('validado')
            } else {
                return('dados incorretos, corrija o email')
            }
        } else {
            return('Os campos Nome e Email são obrigatórios')
        }
    } else {
        return('Os Dados nao foram recebidos pelo validador');
    }
}