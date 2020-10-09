const onSubmit = async (e) => {
  e.preventDefault();
  if (password !== password2) {
    console.log("Password do not match");
  } else {
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const config = {
        headers: { "content-type": "application/json" },
      };
      const body = JSON.stringify(newUser);
      // console.log(body, newUser);
      const res = await axios.post("/api/users", body, config);
      // console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }
};
