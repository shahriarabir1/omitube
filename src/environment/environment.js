const environment = {};

environment.staging = {
  name: "staging",
  port: 3000,
};

environment.development = {
  name: "development",
  port: 4000,
};

environment.production = {
  name: "production",
  port: 5000,
};

const names =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const output =
  typeof environment[names] === "object"
    ? environment[names]
    : environment.staging;

export default output;
