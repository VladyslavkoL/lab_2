'use strict'

const selledTicketsModel = new SelledTickets()

function initAddForm () {
  const form = window.document.querySelector('#selled_tickets-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const selledTicketsData = {}
    
    formData.forEach((value, key) => {
        selledTicketsData[key] = value
    })
    selledTicketsData['date'] = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (document.getElementById("form-button").innerHTML === "Save") {
      selledTicketsModel.Edit(selledTicketsData)
    } else {
      selledTicketsModel.Create(selledTicketsData)
    }

    e.target.reset()
  })
}



function initList () {
  window.jQuery('#selled_tickets-list').DataTable({
    data: selledTicketsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Passanger', data: 'passanger',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="selled_tickets/'+ row['id']  + '"  > '+row['passanger'] +' </a>'
          }
          return data
        }
      },
      { title: 'Train',
        data: 'train',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="selled_tickets/'+ row['id']  + '"  > '+row['train'] +' </a>'
          }
          return data
        }
      },
      { title: 'Ticket',
        data: 'ticket',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="selled_tickets/'+ row['id']  + '"  > '+row['ticket'] +' </a>'
          }
          return data
        }
      },
      { title: 'Date',
        data: 'date',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="selled_tickets/'+ row['id']  + '"  > '+row['date'] +' </a>'
          }
          return data
        }
      },
      { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="selledTicketsModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
      {
        title: 'Delete',
        data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="selledTicketsModel.DeleteById(' + row['id'] + ')"> Delete </button>'
          }
          return data
        }
      },
    ]
  })
}

function initListEvents () {
  document.addEventListener('selled_ticketssListDataChanged', function (e) {
    const dataTable = window.jQuery('#selled_tickets-list').DataTable()

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