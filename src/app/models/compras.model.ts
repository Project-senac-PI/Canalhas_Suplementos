import { ItemCarrinho } from "./carrinho.model";

//definir dados da compra
export interface Compra {
    id?: number;
    data: string;
    itens: ItemCarrinho[];
    total: number;
}
