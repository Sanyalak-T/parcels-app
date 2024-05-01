/** @format */

// const dayjs = require('dayjs');

// add modal
let addParcelModal = document.getElementById('parcelmodalform');
let parcelModal = document.getElementById('modalcontainer');
let closeparcelModal = document.getElementById('closemodal');

// add form
let addParcelForm = document.querySelector('.addparcelform');
let arrivalDate = document.getElementById('arrivaldate');
console.log(arrivalDate, typeof arrivalDate);
let numberOrCode = document.getElementById('numberorcode');
let brandTypeModelSizeDescrip = document.getElementById(
  'brandtypemodelsizedescrip'
);
let unitPrice = document.getElementById('unitprice');
let howToGet = document.getElementById('howtoget');
let stationary = document.getElementById('stationary');
let parcelRemark = document.getElementById('parcelremark');
let saveParcel = document.getElementById('saveparcel');
let resetParcel = document.getElementById('resetparcel');

// data show
let tbodySection = document.getElementById('table-body');

let parcelId;
tbodySection.addEventListener('click', (e) => {
  e.preventDefault();

  parcelId = e.target.parentElement.parentElement.parentElement.dataset.id;

  let deletebtn = e.target.id === 'deleteId';
  let editbtn = e.target.id === 'editId';

  // delete data by id
  // e.target.tagName can use
  if (deletebtn) {
    if (confirm('คุณจะลบข้อมูลแถวนี้หรือไม่!')) {
      fetch('http://localhost:3000/parcels/' + parcelId, {
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
    let arrivalDateEl = parent.querySelector('.arrivalDate').textContent;
    console.log(arrivalDateEl, typeof arrivalDateEl);
    let numberOrCodeEl = parent.querySelector('.numberOrCode').textContent;
    let brandTypeModelSizeDescripEl = parent.querySelector(
      '.brandTypeModelSizeDescrip'
    ).textContent;
    let unitPriceEl = parent.querySelector('.unitPrice').textContent;
    let howToGetEl = parent.querySelector('.howToGet').textContent;
    let stationaryEl = parent.querySelector('.stationary').textContent;
    let parcelRemarkEl = parent.querySelector('.parcelRemark').textContent;

    let showDMY = arrivalDateEl;
    let dd = showDMY.substring(0, 2);
    let mm = showDMY.substring(3, 5);
    let yyyy = showDMY.substring(6, 10);
    let timereceiving = `${yyyy}-${mm}-${dd}`;
    console.log(timereceiving);

    arrivalDate.value = timereceiving;
    let x = arrivalDate.value;
    console.log(typeof x);

    numberOrCode.value = numberOrCodeEl;
    brandTypeModelSizeDescrip.value = brandTypeModelSizeDescripEl;
    unitPrice.value = unitPriceEl;
    howToGet.value = howToGetEl;
    stationary.value = stationaryEl;
    parcelRemark.value = parcelRemarkEl;

    addParcelModalForm();

    // let text = timereceiving;
    // let obj = JSON.parse(text, function (key, value) {
    //   if (key === text) {
    //     return new Date(value);
    //   } else {
    //     return value;
    //   }
    // });

    let dObj = new Date(timereceiving);
    console.log(dObj, typeof dObj);
    arrivalDateEl = dObj;
    // console.log(d, typeof d);
    // let day = d.getDate();
    // let month = d.getMonth() + 1;
    // let year = d.getFullYear();
    // let dmy = `${year}-${month}-${day}`;
    // console.log(dmy, typeof dmy);
    // let dmyObj = JSON.parse(dmy, function (key, value) {
    //   console.log(dmyObj);
    // });
    // console.log(dmyObj, typeof dmyObj);

    saveParcel.addEventListener('click', (e) => {
      e.preventDefault();

      arrivalDate.value = arrivalDateEl;

      fetch('http://localhost:3000/parcels/' + parcelId, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          arrivaldate: arrivalDate.value,
          numberorcode: numberOrCode.value,
          brandtypemodelsizedescrip: brandTypeModelSizeDescrip.value,
          unitprice: unitPrice.value,
          howtoget: howToGet.value,
          stationary: stationary.value,
          parcelremark: parcelRemark.value,
        }),
      }).then((res) => res.json());
      // resetParcels();
      // location.reload();
    });
  }
});

function getParcels() {
  fetch('http://localhost:3000/parcels')
    .then((res) => res.json())
    .then((parcels) => {
      let parcelsTable = '';
      parcels.map((parcel, idx) => {
        parcelsTable += `
          <tr data-id=${parcel._id}>
            <td>${idx + 1}</td>
            <td>
              <button ><i id="editId" class="far fa-edit"></i></button> |
              <button ><i id="deleteId" class="far fa-trash-alt"></i></button>
            </td>
            <td class="arrivalDate">${dayjs(parcel.arrivaldate).format(
              'DD-MM-YYYY'
            )}</td>
            <td class="numberOrCode">${parcel.numberorcode}</td>
            <td class="brandTypeModelSizeDescrip">${
              parcel.brandtypemodelsizedescrip
            }</td>
            <td class="unitPrice">${parcel.unitprice}</td>
            <td class="howToGet">${parcel.howtoget}</td>
            <td class="stationary">${parcel.stationary}</td>
            <td class="parcelRemark">${parcel.parcelremark}</td>
          </tr>`;
      });

      document.getElementById('table-body').innerHTML = parcelsTable;
    });
}

addParcelForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // add organizations
  fetch('http://localhost:3000/parcels', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      arrivaldate: arrivalDate.value,
      numberorcode: numberOrCode.value,
      brandtypemodelsizedescrip: brandTypeModelSizeDescrip.value,
      unitprice: unitPrice.value,
      howtoget: howToGet.value,
      stationary: stationary.value,
      parcelremark: parcelRemark.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  location.reload();
});

function resetParcels() {
  arrivalDate.value = '';
  numberOrCode.value = '';
  brandTypeModelSizeDescrip.value = '';
  unitPrice.value = '';
  howToGet.value = '';
  stationary.value = '';
  parcelRemark.value = '';
}

//add org modal form
function addParcelModalForm() {
  parcelModal.style.display = 'block';
}

//close modal form
function closeParcelModalForm() {
  parcelModal.style.display = 'none';
  resetParcels();
}

addParcelModal.addEventListener('click', addParcelModalForm);
closeparcelModal.addEventListener('click', closeParcelModalForm);

resetParcel.addEventListener('click', resetParcels);

getParcels();
