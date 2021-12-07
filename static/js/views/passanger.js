'use strict'

const passangerModel = new Passanger()

//Ініціалізація форми для Космічної станції
function initAddForm () {
  const form = window.document.querySelector('#passanger-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const passangerData = {}
    formData.forEach((value, key) => {
      passangerData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      passangerModel.Edit(passangerData)
    } else {
      passangerModel.Create(passangerData)
    }

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#passanger-list').DataTable({
    data: passangerModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name',
        data: 'name',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="passanger/'+ row['id']  + '"  > '+row['name'] +' </a>'
          }
          return data
        }
      },
      { title: 'PassportId',
        data: 'passportId',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="passanger/'+ row['id']  + '"  > '+row['passportId'] +' </a>'
          }
          return data
        }
      },
  { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="passangerModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
  {
    title: 'Delete',
    data: 'id',
    render: function (data, type, row, meta) {
      if (type === 'display') {
        data = '<button type="button" onclick="passangerModel.DeleteById(' + row['id'] + ')"> Delete </button>'
      }
      return data
    }
  },
    ]
  })
}

function initListEvents () {
  document.addEventListener('passangersListDataChanged', function (e) {
    const dataTable = window.jQuery('#passanger-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
