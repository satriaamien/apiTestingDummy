const todoSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    todo: { type: "string" },
    completed: { type: "boolean" },
    userId: { type: "number" },
    isDeleted: { type: "boolean" },
    deleteOn: { type: "string" },
  },
  required: ["userId", "completed"],
};
module.exports = Object.freeze(todoSchema);
