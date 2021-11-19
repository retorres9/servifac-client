export class Transaction {
  constructor(
    public pmv_amount: number,
    public pmv_movement: string,
    public provider: string,
    public pmv_description: string,
    public pmv_type?: string,
  ) {
  }
}
