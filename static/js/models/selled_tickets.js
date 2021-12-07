class SelledTickets extends BaseModel {
  constructor () {
    super('selled_tickets')
  
    this.fields = this.fields.concat(['passanger', 'train', 'ticket','date'])
  }
}
