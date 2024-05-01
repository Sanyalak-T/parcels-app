/** @format */

let addParcelTypeModal = document.getElementById('parceltypemodalform');
let parcelTypeModal = document.getElementById('modalcontainer');
let closeparcelTypeModal = document.getElementById('closemodal');

let addParcelTypeForm = document.querySelector('.addparceltypeform');
let parcelTypeName = document.getElementById('parceltypename');
let equipmentKind = document.getElementById('equipmentkind');
let parcelTypeRemark = document.getElementById('parceltyperemark');
let resetParcelType = document.getElementById('resetparceltype');
let saveParcelType = document.getElementById('saveparceltype');
let tbodySection = document.getElementById('table-body');

let parcelTypeId;
tbodySection.addEventListener('click', (e) => {
  e.preventDefault();

  parcelTypeId = e.target.parentElement.parentElement.parentElement.dataset.id;

  let deletebtn = e.target.id === 'deleteId';
  let editbtn = e.target.id === 'editId';

  // delete data by id
  // e.target.tagName can use
  if (deletebtn) {
    if (confirm('คุณจะลบข้อมูลแถวนี้หรือไม่!')) {
      fetch('http://localhost:3000/parceltypes/' + parcelTypeId, {
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
    let parcelTypeNameEl = parent.querySelector('.parcelTypeName').textContent;
    let equipmentKindEl = parent.querySelector('.equipmentKind').textContent;
    let parcelTypeRemarkEl =
      parent.querySelector('.parcelTypeRemark').textContent;

    parcelTypeName.value = parcelTypeNameEl;
    equipmentKind.value = equipmentKindEl;
    parcelTypeRemark.value = parcelTypeRemarkEl;

    addParcelTypesModalForm();

    saveParcelType.addEventListener('click', (e) => {
      e.preventDefault();
      fetch('http://localhost:3000/parceltypes/' + parcelTypeId, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          parceltypename: parcelTypeName.value,
          equipmentkind: equipmentKind.value,
          parceltyperemark: parcelTypeRemark.value,
        }),
      }).then((res) => res.json());
      resetParcelTypes();
      location.reload();
    });
  }
});

function getParcelsTypes() {
  fetch('http://localhost:3000/parceltypes')
    .then((res) => res.json())
    .then((parcelstypes) => {
      let parcelstypesTable = '';
      parcelstypes.map((parceltype, idx) => {
        parcelstypesTable += `
          <tr data-id=${parceltype._id}>
            <td>${idx + 1}</td>
            <td>
              <button ><i id="editId" class="far fa-edit"></i></button> |
              <button ><i id="deleteId" class="far fa-trash-alt"></i></button>
            </td>
            <td class="parcelTypeName">${parceltype.parceltypename}</td>
            <td class="equipmentKind">${parceltype.equipmentkind}</td>
            <td class="parcelTypeRemark">${parceltype.parceltyperemark}</td>
          </tr>`;
      });
      document.getElementById('table-body').innerHTML = parcelstypesTable;
    });
}

addParcelTypeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // add organizations
  fetch('http://localhost:3000/parceltypes', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      parceltypename: parcelTypeName.value,
      equipmentkind: equipmentKind.value,
      parceltyperemark: parcelTypeRemark.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  location.reload();
});

function resetParcelTypes() {
  parcelTypeName.value = '';
  equipmentKind.value = '';
  parcelTypeRemark.value = '';
}

//add org modal form
function addParcelTypesModalForm() {
  parcelTypeModal.style.display = 'block';
}

//close modal form
function closeParcelTypesModalForm() {
  parcelTypeModal.style.display = 'none';
  resetParcelTypes();
}

addParcelTypeModal.addEventListener('click', addParcelTypesModalForm);
closeparcelTypeModal.addEventListener('click', closeParcelTypesModalForm);

resetParcelType.addEventListener('click', resetParcelTypes);

getParcelsTypes();
