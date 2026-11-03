// Images of my Assignment 1 projects. A project saved in MongoDB shows its image
// when its title matches one of these; new projects are shown without an image.
import projects from '../data/projects.js'

const imagesByTitle = Object.fromEntries(projects.map((project) => [project.title, project.image]))

export const findProjectImage = (title) => imagesByTitle[title]
