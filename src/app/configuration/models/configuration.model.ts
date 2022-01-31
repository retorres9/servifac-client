export class Configuration {
  constructor(
    public clientName: string,
    public clientRUC: string,
    public address: string,
    public tax: number,
    public id?: number
  ) {
    id = this.id;
    clientName = this.clientName;
    clientRUC = this.clientRUC;
    address = this.address;
    tax = this.tax;
  }
  // id:         number;
  // clientName: string;
  // clientRUC:  string;
  // address:    string;
  // tax:        number;
}
