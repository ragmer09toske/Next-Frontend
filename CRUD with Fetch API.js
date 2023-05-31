  // Attempt to fetch data from our API: READ
  fetch('http://192.168.42.24:8000/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data here
    console.log(data[1].email);
  })
  .catch(error => {
    // Handle any errors here
    console.error('There was a problem fetching the data:', error);
  });

  // Attemp to post data to our API: CREATE
  const user = {
    name: "John",
    email: "john@example.com",
    number: 1234567890
  };
  
  fetch('http://192.168.42.131:8000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    // Handle any errors here
    console.error('There was a problem with the fetch operation:', error);
  });

  // Attempting a Put request: Update
  const userId = "6450c289d501f2276ff52a93";
  const updatedUser = {
    name: "Not John any more",
    email: "notJohn.email@example.com",
    number: 9876543210
  };

  fetch(`http://192.168.42.131:8000/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUser)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  // Attempting a DELETE request: DELETE
  const userId = "6450c8ded501f2276ff52a96";
  fetch(`http://192.168.42.24:8000/users/6450c8ded501f2276ff52a96`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data here
      console.log(data);
    })
    .catch(error => {
      // Handle any errors here
      console.error('There was a problem with the fetch operation:', error);
    });
