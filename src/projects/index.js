import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";

const router = express.Router();

const thisFilePath = fileURLToPath(import.meta.url);
const __dirname = dirname(thisFilePath);

const getProjects = () => {
  const buffer = fs.readFileSync(join(__dirname, "../data/projects.json"));
  return JSON.parse(buffer.toString());
};

router.get("/", (req, res, next) => {
  try {
    const projects = getProjects();
    if (req.query && req.query.name) {
      const filteredProject = projects.filter(
        (project) =>
          project.hasOwnProperty("name") && project.name === req.query.name
      );
      res.send(filteredProject);
    } else {
      res.send(projects);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const projects = getProjects();
    const project = projects.find((project) => project.ID === req.params.id);
    if (project) {
      res.send(project);
    } else {
      console.log("NOT FOUND");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/",
  [
    check("Name").exists().withMessage("Name is required"),
    check("Description").exists().withMessage("Description is required"),
    check("RepoURL").exists().withMessage("RepoURL is required"),
    check("LiveURL").exists().withMessage("LiveURL is required"),
  ],
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error();
        err.errorList = errors;
        err.httpStatusCode = 400;
        next(err);
      } else {
        const projects = getProjects();
        const newProject = { ...req.body, ID: uniqid(), createdAT: new Date() };
        projects.push(newProject);
        fs.writeFileSync(
          join(__dirname, "projects.json"),
          JSON.stringify(projects)
        );
        res.status(201).send({ id: newProject.ID });
      }
    } catch (error) {
      error.httpStatusCode = 500;
      console.error("ERROR 500")
      next(error);
    }
  }
);

router.put("/:id", (req, res, next) => {
  try {
    const projects = getProjects();
    const newProject = projects.filter(
      (project) => project.ID !== req.params.id
    );
    const modifiedProject = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    };
    newProject.push(modifiedProject);
    fs.writeFileSync(
      join(__dirname, "projects.json"),
      JSON.stringify(newProject)
    );
    res.send(modifiedProject);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const projects = getProjects();
    const newProject = projects.filter(
      (project) => project.ID !== req.params.id
    );
    fs.writeFileSync(
      join(__dirname, "projects.json"),
      JSON.stringify(newProject)
    );
    res.status(204).send("DELETED");
  } catch (error) {
    console.log(error);
  }
});

export default router;
