'use strict'

const trainModel = new Train()

//Ініціалізація форми для Вантажу
function initAddForm () {
  const form = window.document.querySelector('#train-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const trainData = {}
    formData.forEach((value, key) => {
      trainData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      trainModel.Edit(trainData)
    } else {
      trainModel.Create(trainData)
    }

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#train-list').DataTable({
    data: trainModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="train/'+ row['id']  + '"  > '+row['name'] +' </a>'
          }
          return data
        }
      },
      { title: 'Route', data: 'route',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="train/'+ row['id']  + '"  > '+row['route'] +' </a>'
          }
          return data
        }
      },
      { title: 'Number', data: 'number',
      render: function (data, type, row, meta) {
        if (type === 'display') {
          data = '<a href="train/'+ row['id']  + '"  > '+row['number'] +' </a>'
        }
        return data
      }
    },
      { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="trainModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
      {
        title: 'Delete',
        data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="trainModel.DeleteById(' + row['id'] + ')"> Delete </button>'
          }
          return data
        }
      },

    ]
  })
}


function initListEvents () {
  document.addEventListener('trainsListDataChanged', function (e) {
    const dataTable = window.jQuery('#train-list').DataTable()

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
