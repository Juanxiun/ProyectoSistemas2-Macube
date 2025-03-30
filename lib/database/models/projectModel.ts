export default interface projectModel {
    id: number;
    titulo: string;
    tipo_pro: string;
    inicio: Date;
    final?: Date;
    estado: string;
    cicli: number;
    codearq: number;
}