export class Client {
  cli_ci: string;
  cli_firstName: string;
  cli_lastName: string;
  cli_email: string;
  cli_phone: string;
  cli_debt: number;
  cli_isActive: boolean;
  cli_address: string;
  cli_credit: number
}

export class ClientInfo {
  client: Client;
  debt:   number;
  credit: number;
}


