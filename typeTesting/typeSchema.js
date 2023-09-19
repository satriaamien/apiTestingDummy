const alltodoschema = {
  type: "object",
  properties: {
    todos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          todo: { type: "string" },
          completed: { type: "boolean" },
          userId: { type: "number" },
        },
        required: ["id"],
      },
    },
  },
};

module.exports = Object.freeze(alltodoschema);
