class Ticket extends BaseModel {
  constructor () {
    super('ticket')
  
    this.fields = this.fields.concat(['number','price'])
  }
}
  