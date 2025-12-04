export const getCustomers = (req, res) => {
  return res.status(200).send("Get all customers");
};

export const getCustomerById = (req, res) => {
  const { id } = req.params;
  return res.status(200).send(`Get customer with ID: ${id}`);
};

export const createCustomer = (req, res) => {
  return res.status(201).send("Create a new customer");
};

export const updateCustomer = (req, res) => {
  const { id } = req.params;
  return res.status(200).send(`Update customer with ID: ${id}`);
};

export const deleteCustomer = (req, res) => {
  const { id } = req.params;
  return res.status(200).send(`Delete customer with ID: ${id}`);
};
