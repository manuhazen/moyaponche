import uuid from "uuid";

export function uniqueID() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return (
    chr4() +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    chr4() +
    chr4()
  );
}

export const DATA = [
  {
    date: new Date(),
    by: "Alex Moya",
    id: uuid.v4(),
    type: 1,
  },
  {
    date: new Date(),
    by: "Emmanuel Jimenez",
    id: uuid.v4(),
    type: 1,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
  {
    date: new Date(),
    by: "Nelkys Cuevas",
    id: uuid.v4(),
    type: 0,
  },
];
