export interface PaymentResponse {
    numeroReferencia: string;
    totalCompra: number;
    estadoTransaccion: string;
    fechaTransaccion: string;
    fechaAnulacion?: string;
}