export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const rowData = [
  {
    Id: generateUniqueId(),
    Name: "Abhishek",
    Dob: "06-01-2000",
    Age: 23,
    Std: 6,
    Address: "Bbsr bhubaneswar orakal sundarpada",
    Gender: "male",
    Action: "",
  },
  {
    Id: generateUniqueId(),
    Name: "subham",
    Dob: "23-01-2000",
    Age: 23,
    Std: 6,
    Address: "Bbsr bhubaneswar orakal sundarpada",
    Gender: "female",
    Action: "",
  },
];
