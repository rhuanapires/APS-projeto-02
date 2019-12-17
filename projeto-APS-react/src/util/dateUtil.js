export function getCurrentData() {
  const date = new Date();
  let dia = date.getDate();
  let mes = date.getMonth();
  const ano = date.getFullYear();

  console.log(dia, mes);
  dia = dia.toString().length === 1 ? 0 + dia : dia;
  mes = mes + 1;
  mes = mes.toString().length === 1 ? 0 + mes : mes;

  return dia + "/" + mes + "/" + ano;
}
