/** @format */

const clickMe = document.getElementById('clickMe');
const timeName = document.getElementById('time-name');
const timeDate = document.getElementById('time-date');
console.log(typeof timeDate, timeDate);
const timeDate2 = document.getElementById('time-date2');
const showInfo = document.getElementById('showData');

function editData(e) {
  e.preventDefault();

  let dataId = e.target.dataset.id;
  let editBtn = e.target.id === 'editId';
  console.log(dataId);

  if (editBtn) {
    console.log(editBtn);
    let timeNameEl = e.target.parentElement.children[1].textContent;
    console.log(timeNameEl);
    let timeDateEl = e.target.parentElement.children[2].textContent;

    // let x = timeDateEl.split('-');
    // const year = parseInt(x[2], 10);
    // const month = parseInt(x[1], 10) - 1;
    // const day = parseInt(x[0], 10);

    // const dateObject = new Date(year, month, day);
    // console.log(dateObject, typeof dateObject);

    // console.log(typeof timeDateEl, timeDateEl);
    // let timeDateElx = Date.parse(timeDateEl);
    // console.log(typeof timeDateElx, timeDateElx);
    // let timeDateEly = new Date(timeDateElx);
    // console.log(typeof timeDateEly, timeDateEly);
    // let formatForm = 'yyyy-MM-dd';
    // let locale = 'en-US';
    // let formatW = formatDate(timeDateEly, formatForm, locale);

    timeName.value = timeNameEl;
    timeDate.value = timeDateEl;
    // timeDate.value = dateObject;

    clickMe.addEventListener('click', (e) => {
      e.preventDefault();

      fetch('http://localhost:3000/testingtimes/' + dataId, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          testingtimename: timeName.value,
          testingtimedate: timeDate.value,
        }),
      }).then((res) => res.json());
      clearData();
      location.reload();
    });
  }
}

function saveData(e) {
  e.preventDefault();

  fetch('http://localhost:3000/testingtimes', {
    method: 'POST',
    headers: {
      Accept: 'application/json, */*',
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      testingtimename: timeName.value,
      testingtimedate: timeDate.value,
    }),
  })
    .then((res) => res.json)
    .then((data) => console.log(data));
  clearData();
  location.reload();
}

function showData(e) {
  //   e.preventDefault();

  fetch('http://localhost:3000/testingtimes')
    .then((res) => res.json())
    .then((data) => {
      let showData = '';
      data.map((dataList, idx) => {
        let formatTime = dataList.testingtimedate.slice(0, 10);
        console.log(typeof formatTime, formatTime);
        //dataList.testingtimename
        // let formatTime = dataList.testingtimedate;
        // console.log(formatTime);
        // let formatTimex = dataList.testingtimedate.toLocaleDateString();
        showData += `
            <div>
            <p>${idx + 1}</p>
            <p>${dataList.testingtimename}</p>
            <p>${formatTime}</p>
            <button id='editId' data-id=${dataList._id}>Edit</button>
            <button id='deleteId' data-id=${dataList._id}>Delete</button>
            <hr />
            </div>
        `;
      });
      showInfo.innerHTML = showData;
    });
}

function deleteData(e) {
  e.preventDefault();

  let dataId = e.target.dataset.id;
  let deleteBtn = e.target.id === 'deleteId';

  if (deleteBtn) {
    if (confirm('Are you sure that delete record!')) {
      fetch('http://localhost:3000/testingtimes/' + dataId, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, */*',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      location.reload();
    }
  }
}

function clearData() {
  timeName.value = '';
  timeDate.value = '';
}

showInfo.addEventListener('click', editData);
showInfo.addEventListener('click', deleteData);
clickMe.addEventListener('click', saveData);
showData();

// function showDate() {
//     const tN = timeName.value;
//     const tD = timeDate.value;
//     console.log(tN);
//     console.log(tD);
//     clearDate();
//   }
