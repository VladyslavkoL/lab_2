'use strict'

const ticketModel = new Ticket()

//Ініціалізація форми для Виконавця
function initAddForm () {
  const form = window.document.querySelector('#ticket-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const ticketData = {}
    formData.forEach((value, key) => {
      ticketData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      ticketModel.Edit(ticketData)
    } else {
      ticketModel.Create(ticketData)
    }

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#ticket-list').DataTable({
    data: ticketModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Ticket Number',
        data: 'number',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="ticket/'+ row['id']  + '"  > '+row['number'] +' </a>'
          }
          return data
        }
      },
      { title: 'Price', data: 'price',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="ticket/'+ row['id']  + '"  > '+row['price'] +' </a>'
          }
          return data
        }
      },
      { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="ticketModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
      {
        title: 'Delete',
        data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="ticketModel.DeleteById(' + row['id'] + ')"> Delete </button>'
          }
          return data
        }
      },

    ]
  })
}




function initListEvents () {
  document.addEventListener('ticketsListDataChanged', function (e) {
    const dataTable = window.jQuery('#ticket-list').DataTable()

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
