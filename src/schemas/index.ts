import Joi from "joi";

export const CollaboratorSchema = Joi.object({
    name: Joi.string().required().trim(),
    age: Joi.number().required(),
});

export const TaskSchema = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    collaboratorId: Joi.number().min(0).required(),
});