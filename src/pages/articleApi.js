export async function fetchData(userId, token, month = '') {
  
    //? `https://article-manager-api.onrender.com/articles/${month}/user/${userId}`
  const response = await fetch(`https://article-manager-api.onrender.com/articles/user/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return response.json();
}


export async function fetchDataByMonth(userId, token, month) {
  
    //? `https://article-manager-api.onrender.com/articles/${month}/user/${userId}`
  const response = await fetch(`https://article-manager-api.onrender.com/articles/${month}/user/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return response.json();
}













export async function addArticle(dataObj, userId, token) {

  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      client_name: dataObj.client_name,
      article_name: dataObj.article_name,
      contractor: dataObj.contractor,
      article_type: dataObj.article_type,
      status: dataObj.status,
      user_id: userId,
     }),
  };

  const response = await fetch('https://article-manager-api.onrender.com/articles/newArticle/', requestOptions);

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

  const response = await fetch(`https://article-manager-api.onrender.com/articles/${dataObj.id}/user/${userId}`, requestOptions);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}

export async function updateArticleStatus(id, dataObj, userId, token) {
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

  const response = await fetch(`https://article-manager-api.onrender.com/articles/${id}/status/${userId}`, requestOptions);


  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
}