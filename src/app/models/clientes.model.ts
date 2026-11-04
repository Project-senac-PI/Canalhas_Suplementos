//definir dados do cliente
export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    endereco: string;
    numero: string;
    complemento?: string;
    email: string;
    senha?: string;
    newsletter?: boolean;
}
