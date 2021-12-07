class Passanger extends BaseModel {
  constructor () {
    super('passanger')

    this.fields = this.fields.concat(['name', 'passportId']) 
  }
}
