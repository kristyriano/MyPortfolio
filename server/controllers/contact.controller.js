// Contact controller: CRUD operations for the "contacts" collection
import Contact from '../models/contact.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// POST /api/contacts -> add a new contact
const create = async (req, res) => {
  const contact = new Contact(req.body)
  try {
    await contact.save()
    return res.status(200).json({ message: 'Contact successfully created!', contact })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/contacts -> get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find().select('firstname lastname email')
    res.json(contacts)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Runs for every route with :contactId -> finds the contact and saves it in req.contact
const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    req.contact = contact
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve contact' })
  }
}

// GET /api/contacts/:contactId -> get contact by id
const read = (req, res) => {
  return res.json(req.contact)
}

// PUT /api/contacts/:contactId -> update contact by id
const update = async (req, res) => {
  try {
    let contact = req.contact
    contact = extend(contact, req.body)
    await contact.save()
    res.json(contact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/contacts/:contactId -> remove contact by id
const remove = async (req, res) => {
  try {
    const contact = req.contact
    await contact.deleteOne()
    res.json({ message: 'Contact successfully deleted!', contact })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/contacts -> remove all contacts
const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({})
    res.json({ message: `${result.deletedCount} contact(s) deleted successfully!` })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, contactByID, read, list, update, remove, removeAll }
