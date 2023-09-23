
export function converterNumeroParaData(numero) {
  // Suponha que a data de referência seja 01/01/1970
  const dataReferencia = new Date(1900, 0, -1);
  const dataConvertida = new Date(dataReferencia);
  
  // Adicione o número de dias ao objeto de data
  dataConvertida.setDate(dataReferencia.getDate() + numero);
  
  return dataConvertida;
}