class Train extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('train')
    this.fields = this.fields.concat(['name', 'route','number'])
  }
}
