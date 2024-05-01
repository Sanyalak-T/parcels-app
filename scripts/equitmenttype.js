/** @format */

let addEquipmentTypeModal = document.getElementById('equipmenttypemodalform');
let modal = document.getElementById('modalcontainer');
let closeModal = document.getElementById('closemodal');

let addEquipmentTypeForm = document.querySelector('.addequipmenttypeform');
let equipmentTypeName = document.getElementById('equipmenttypename');
let equipmentTypeNameRemark = document.getElementById(
  'equipmenttypenameremark'
);

let btnSaveEquipmentType = document.getElementById('btnSaveEquipmentType');
let clearEquipmentType = document.getElementById('btnClearEquipmentType');
let tbodySection = document.getElementById('table-body');

let equipmentTypeNameId;
tbodySection.addEventListener('click', (e) => {
  e.preventDefault();

  equipmentTypeNameId =
    e.target.parentElement.parentElement.parentElement.dataset.id;

  let editbtn = e.target.id === 'editId';
  let deletebtn = e.target.id === 'deleteId';

  // delete data by id
  // e.target.tagName can use

  if (deletebtn) {
    if (confirm('คุณจะลบข้อมูลแถวนี้หรือไม่!')) {
      fetch('http://localhost:3000/equitmenttypes/' + equipmentTypeNameId, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent = e.target.parentElement.parentElement.parentElement;
    let equipmentTypeNameEl =
      parent.querySelector('.equipmentTypeName').textContent;
    let equipmentTypeNameRemarkEl = parent.querySelector(
      '.equipmentTypeNameRemark'
    ).textContent;

    equipmentTypeName.value = equipmentTypeNameEl;
    equipmentTypeNameRemark.value = equipmentTypeNameRemarkEl;

    addEquipmentTypeModalForm();

    btnSaveEquipmentType.addEventListener('click', (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/equipmenttypes/' + equipmentTypeNameId, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          equipmenttypename: equipmentTypeName.value,
          equipmenttypenameremark: equipmentTypeNameRemark.value,
        }),
      }).then((res) => res.json());
      resetEquipmentType();
      location.reload();
    });
  }
});

function getEquipmentTypes() {
  fetch('http://localhost:3000/equipmenttypes')
    .then((res) => res.json())
    .then((equipmentTypes) => {
      let equipmentTypesTable = '';
      equipmentTypes.map((equipmentTypesList, idx) => {
        equipmentTypesTable += `
          <tr data-id=${equipmentTypesList._id}>
            <td>${idx + 1}</td>
            <td>
              <button ><i id="editId" class="far fa-edit"></i></button> |
              <button ><i id="deleteId" class="far fa-trash-alt"></i></button>
            </td>
            <td class="equipmentTypeName">${
              equipmentTypesList.equipmenttypename
            }</td>
            <td class="equipmentTypeNameRemark">${
              equipmentTypesList.equipmenttypenameremark
            }</td>
          </tr>`;
      });
      document.getElementById('table-body').innerHTML = equipmentTypesTable;
    });
}

addEquipmentTypeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // add equipmenttypes
  fetch('http://localhost:3000/equipmenttypes', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      equipmenttypename: equipmentTypeName.value,
      equipmenttypenameremark: equipmentTypeNameRemark.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  location.reload();
});

function closeModalEquipmentTypeList() {
  let modal = document.getElementById('modalcontainer');
  modal.style.display = 'none';
}

function resetEquipmentType() {
  equipmentTypeName.value = '';
  equipmentTypeNameRemark.value = '';
}

// add department modal form
function addEquipmentTypeModalForm() {
  modal.style.display = 'block';
}

// close modal form
function closeModalForm() {
  modal.style.display = 'none';
  resetEquipmentType();
}

addEquipmentTypeModal.addEventListener('click', addEquipmentTypeModalForm);
closeModal.addEventListener('click', closeModalForm);

clearEquipmentType.addEventListener('click', resetEquipmentType);

getEquipmentTypes();
