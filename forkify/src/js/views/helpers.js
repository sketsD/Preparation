import { TIMEOUT_SEC } from '../config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAXcall = async function (url, uploadData = undefined) {
  try {
    const getPost = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([getPost, timeout(TIMEOUT_SEC)]);
    const dataJSON = await res.json();
    if (!res.ok) throw new Error(`This is ${dataJSON.message} ${res.status}`);

    return dataJSON.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     // const fetchGet = fetch(url);
//     const res = await Promise.race([fetchGet, timeout(TIMEOUT_SEC)]);
//     const dataJSON = await res.json();
//     if (!res.ok) throw new Error(`This is ${dataJSON.message} ${res.status}`);

//     return dataJSON.data;
//   } catch (err) {
//     // console.log(err);
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     // const fetchPost = fetch(url, {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(uploadData),
//     // });

//     const res = await Promise.race([fetchPost, timeout(TIMEOUT_SEC)]);
//     const dataJSON = await res.json();
//     if (!res.ok) throw new Error(`This is ${dataJSON.message} ${res.status}`);

//     return dataJSON;
//   } catch (err) {
//     // console.log(err);
//     throw err;
//   }
// };
