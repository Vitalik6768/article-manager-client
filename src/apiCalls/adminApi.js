

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


// export async function fetchDataByMonth(userId, token, month) {
  
//   const response = await fetch(`${url}/articles/${month}/user/${userId}`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
  
//   return response.json();
// }





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

export async function updateArticle(dataObj, userId, token) {

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      client_name: dataObj.client_name,
      article_name: dataObj.article_name,
      contractor: dataObj.contractor,
      article_type: dataObj.article_type,
    }),
  };

  const response = await fetch(`${url}/articles/${dataObj.id}/user/${userId}`, requestOptions);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}

export async function updateArticlesStatus(id, dataObj, userId, token) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: dataObj,
    }),
  };


  const response = await fetch(`${url}/articles/${id}/status/${userId}`, requestOptions);


  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}