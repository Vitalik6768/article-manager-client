

const url = 'https://article-manager-api.onrender.com';



export async function fetchUsersData(id, token) {

  const response = await fetch(`${url}/admin/${id}/`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}


export async function addNewUsers(dataObj, tokenCaptch, token, username) {


  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: dataObj.name,
      email: dataObj.email,
      password: dataObj.password,
      passwordConfirm: dataObj.passwordConfirm,
      role: dataObj.role,
      token: tokenCaptch
    }),
  };

  const response = await fetch(`${url}/admin/${username}/register`, requestOptions);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}

export async function updateUsersRole(dataObj, id, token, username) {

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      role: dataObj
    }),
  };

  const response = await fetch(`${url}/admin/${username}/update/${id}`, requestOptions);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}

export async function updateUsersStatus(dataObj, id, token, username) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: dataObj
    }),
  };



  const response = await fetch(`${url}/admin/${username}/status/${id}`, requestOptions);


  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}


export async function deleteUsers(id, username) {
  const requestOptions = {
    method: 'DELETE'
  };

  const response = await fetch(`${url}/admin/${username}/delete/${id}`, requestOptions);



  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}